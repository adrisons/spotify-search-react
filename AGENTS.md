# AGENTS.md

## Cursor Cloud specific instructions

### Node.js version

This project requires **Node.js 22+** (uses Vite 6, Tailwind v4, and modern ESM).  
Node 22 is set as default via nvm (`nvm alias default 22`).

### Environment variables

A `.env` file at the project root with Spotify OAuth credentials is required. See `README.md` for details. Without a valid `VITE_SPOTIFY_CLIENT_ID`, the app loads but OAuth login won't complete.

The Cursor Cloud secret is named `REACT_APP_SPOTIFY_CLIENT_ID` — map it to the Vite env var in `.env`:
```
VITE_SPOTIFY_CLIENT_ID=${REACT_APP_SPOTIFY_CLIENT_ID}
VITE_SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000
```

**Important:** Spotify requires `http://127.0.0.1:3000` (not `localhost`) for HTTP redirect URIs. This must also be configured in the Spotify Developer App dashboard under "Redirect URIs".

### Package manager

This project uses **pnpm** (lockfile: `pnpm-lock.yaml`). Do not use npm or yarn.

### Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Vite dev server on port 3000 |
| `pnpm build` | TypeScript check + production build |
| `pnpm test` | Run Vitest (single run) |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm lint` | ESLint flat config |
| `pnpm storybook` | Storybook on port 6006 |

### Architecture

Clean architecture with four layers:
- **domain/** — Models/types only (no dependencies)
- **infrastructure/** — API integration (HTTP client, Spotify API/auth)
- **application/** — State management (Redux Toolkit store)
- **ui/** — React components (presentational in `components/`, container in `pages/`)

Path aliases are configured in both `tsconfig.json` and `vite.config.ts`: `@domain/*`, `@infrastructure/*`, `@application/*`, `@ui/*`, `@config/*`, `@assets/*`.

### Key caveats

- **OAuth uses PKCE flow** (`response_type=code` + `code_challenge`). The old implicit grant (`response_type=token`) no longer works with Spotify.
- Dev server binds to `127.0.0.1:3000` (not `localhost`) to match the Spotify redirect URI requirement.
- Storybook uses `@storybook/react-vite` — shares the Vite config for path aliases.
- Tailwind v4 uses the `@tailwindcss/vite` plugin (no `tailwind.config.js` needed).
- Redux Toolkit is used instead of legacy Redux for type-safe, concise slices.
- ESLint uses flat config (`eslint.config.js`) — no `.eslintrc` file.
