# AGENTS.md

Instructions for AI agents working on this repository in **any environment** (local machine, CI, Cursor IDE, Cursor Cloud, etc.). For human onboarding, see `README.md`.

## SPOTIFY guidelines

You are helping me build an application using the Spotify Web API. Follow these rules:

- OpenAPI spec: Refer to the Spotify OpenAPI specification at https://developer.spotify.com/reference/web-api/open-api-schema.yaml for all endpoint paths, parameters, and response schemas. Do not guess endpoints or field names.
- Authorization: Use the Authorization Code with PKCE flow (https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow) for any user-specific data. If the app has a secure backend, the Authorization Code flow (https://developer.spotify.com/documentation/web-api/tutorials/code-flow) is also acceptable. Only use Client Credentials for public, non-user data. Never use the Implicit Grant flow (it is deprecated).
- Redirect URIs: Always use HTTPS redirect URIs (except http://127.0.0.1 for local development). Never use http://localhost or wildcard URIs. See https://developer.spotify.com/documentation/web-api/concepts/redirect_uri for requirements.
- Scopes: Request only the minimum scopes (https://developer.spotify.com/documentation/web-api/concepts/scopes) needed for the features being built. Do not request broad scopes preemptively.
- Token management: Store tokens securely. Never expose the Client Secret in client-side code. Implement token refresh (https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens) logic so the app does not break when access tokens expire.
- Rate limits: Implement exponential backoff and respect the Retry-After header when receiving HTTP 429 responses. Do not retry immediately or in tight loops.
- Deprecated endpoints: Do not use deprecated endpoints. Prefer /playlists/{id}/items over /playlists/{id}/tracks, and use /me/library over the type-specific library endpoints.
- Error handling: Handle all HTTP error codes documented in the OpenAPI schema. Read the returned error message and use it to provide meaningful feedback to the user.
- Developer Terms of Service: Comply with the Spotify Developer Terms (https://developer.spotify.com/terms). In particular: do not cache Spotify content beyond what is needed for immediate use, always attribute content to Spotify, and do not use the API to train machine learning models on Spotify data.

## Prerequisites

| Requirement     | Details                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Node.js**     | 22+ (Vite 6, Tailwind v4, modern ESM). Use `nvm install 22` / `nvm use 22` if needed.                                                              |
| **pnpm**        | Required package manager (`packageManager` field in `package.json`). Enable via `corepack enable` or install globally. Do **not** use npm or yarn. |
| **Spotify app** | [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) app with redirect URI configured (see below).                              |

## Setup

```bash
pnpm install
```

Create a `.env` file at the project root (gitignored — never commit it):

```
VITE_SPOTIFY_CLIENT_ID=<your_spotify_app_client_id>
VITE_SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000
```

Without a valid `VITE_SPOTIFY_CLIENT_ID`, the app loads but OAuth login will not complete. OAuth config lives in `src/config/oauth.ts`; env types are in `vite-env.d.ts`.

**Redirect URI:** Spotify requires `http://127.0.0.1:3000` — not `localhost`. Add this exact URI in the Spotify app dashboard under **Redirect URIs**. The Vite dev server is bound to `127.0.0.1:3000` in `vite.config.ts` to match.

## Commands

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `pnpm dev`             | Vite dev server at `http://127.0.0.1:3000` |
| `pnpm build`           | TypeScript check + production build        |
| `pnpm preview`         | Preview production build locally           |
| `pnpm test`            | Vitest (single run)                        |
| `pnpm test:watch`      | Vitest in watch mode                       |
| `pnpm test:coverage`   | Vitest with coverage report                |
| `pnpm lint`            | ESLint (flat config in `eslint.config.js`) |
| `pnpm storybook`       | Storybook on port 6006                     |
| `pnpm build-storybook` | Static Storybook build                     |

After substantive changes, run `pnpm test` and `pnpm lint` (and `pnpm build` when touching build/config).

## Architecture

Clean architecture with four layers under `src/`:

| Layer              | Path                  | Responsibility                                              |
| ------------------ | --------------------- | ----------------------------------------------------------- |
| **domain**         | `src/domain/`         | Models and types only — no framework or IO dependencies     |
| **infrastructure** | `src/infrastructure/` | HTTP client, Spotify API and auth                           |
| **application**    | `src/application/`    | Redux Toolkit store, slices, persistence                    |
| **ui**             | `src/ui/`             | React UI — presentational `components/`, container `pages/` |

Supporting folders: `src/config/` (OAuth/env helpers), `src/test/` (Vitest setup).

Path aliases (in `tsconfig.json` and `vite.config.ts`): `@domain/*`, `@infrastructure/*`, `@application/*`, `@ui/*`, `@config/*`, `@assets/*`.

**Layer rules for agents:** keep dependencies pointing inward (ui → application → infrastructure → domain). Do not import UI from domain or infrastructure from ui.

## Key caveats

- **OAuth uses PKCE** (`response_type=code` + `code_challenge`). The implicit grant (`response_type=token`) no longer works with Spotify.
- **Dev host** is `127.0.0.1`, not `localhost`, for Spotify redirect compatibility.
- **Storybook** uses `@storybook/react-vite` and shares Vite path aliases.
- **Tailwind v4** via `@tailwindcss/vite` — no `tailwind.config.js`.
- **Redux Toolkit** + `redux-persist` for session state; not legacy Redux boilerplate.
- **ESLint** flat config only (`eslint.config.js`) — no `.eslintrc`.
- **Do not commit** `.env`, `node_modules/`, `dist/`, `.pnpm-store/`, or coverage output (see `.gitignore`).

## Environment-specific notes

### Cursor Cloud

If the workspace provides a secret named `REACT_APP_SPOTIFY_CLIENT_ID`, map it in `.env`:

```
VITE_SPOTIFY_CLIENT_ID=${REACT_APP_SPOTIFY_CLIENT_ID}
VITE_SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000
```

### CI / headless

Tests use Vitest + jsdom; no browser or Spotify credentials required for unit tests. OAuth flows are not exercised in CI unless explicitly mocked.
