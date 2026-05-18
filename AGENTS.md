# AGENTS.md

## Cursor Cloud specific instructions

### Node.js version

This project requires **Node.js 22+** (uses Vite 6, Tailwind v4, and modern ESM).  
Node 22 is set as default via nvm (`nvm alias default 22`).

### Environment variables

A `.env` file at the project root with Spotify OAuth credentials is required. See `README.md` for details. Without a valid `VITE_SPOTIFY_CLIENT_ID`, the app loads but OAuth login won't complete.

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server on port 3000 |
| `npm run build` | TypeScript check + production build |
| `npm run test` | Run Vitest (single run) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run lint` | ESLint flat config |
| `npm run storybook` | Storybook on port 6006 |

### Architecture

Clean architecture with four layers:
- **domain/** — Models/types only (no dependencies)
- **infrastructure/** — API integration (HTTP client, Spotify API/auth)
- **application/** — State management (Redux Toolkit store)
- **ui/** — React components (presentational in `components/`, container in `pages/`)

Path aliases are configured in both `tsconfig.json` and `vite.config.ts`: `@domain/*`, `@infrastructure/*`, `@application/*`, `@ui/*`, `@config/*`, `@assets/*`.

### Key caveats

- Storybook uses `@storybook/react-vite` — shares the Vite config for path aliases.
- Tailwind v4 uses the `@tailwindcss/vite` plugin (no `tailwind.config.js` needed).
- Redux Toolkit is used instead of legacy Redux for type-safe, concise slices.
- ESLint uses flat config (`eslint.config.js`) — no `.eslintrc` file.
