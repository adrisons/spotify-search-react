# AGENTS.md

Instructions for AI agents working on this repository in **any environment** (local machine, CI, Cursor IDE, Cursor Cloud, etc.). For human onboarding, see `README.md`.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **Node.js** | 22+ (Vite 6, Tailwind v4, modern ESM). Use `nvm install 22` / `nvm use 22` if needed. |
| **pnpm** | Required package manager (`packageManager` field in `package.json`). Enable via `corepack enable` or install globally. Do **not** use npm or yarn. |
| **Spotify app** | [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) app with redirect URI configured (see below). |

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

| Command | Description |
|---------|-------------|
| `pnpm dev` | Vite dev server at `http://127.0.0.1:3000` |
| `pnpm build` | TypeScript check + production build |
| `pnpm preview` | Preview production build locally |
| `pnpm test` | Vitest (single run) |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm test:coverage` | Vitest with coverage report |
| `pnpm lint` | ESLint (flat config in `eslint.config.js`) |
| `pnpm storybook` | Storybook on port 6006 |
| `pnpm build-storybook` | Static Storybook build |

After substantive changes, run `pnpm test` and `pnpm lint` (and `pnpm build` when touching build/config).

## Architecture

Clean architecture with four layers under `src/`:

| Layer | Path | Responsibility |
|-------|------|----------------|
| **domain** | `src/domain/` | Models and types only — no framework or IO dependencies |
| **infrastructure** | `src/infrastructure/` | HTTP client, Spotify API and auth |
| **application** | `src/application/` | Redux Toolkit store, slices, persistence |
| **ui** | `src/ui/` | React UI — presentational `components/`, container `pages/` |

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
