# AGENTS.md

## Cursor Cloud specific instructions

### Node.js version

This project requires **Node.js 16** due to the `node-sass` v7 native dependency. Node 16 is installed via nvm and set as the default (`nvm alias default 16`). Always ensure you are using Node 16 before running any commands:

```bash
source ~/.nvm/nvm.sh && nvm use 16
```

### Environment variables

A `.env` file is required at the project root with Spotify OAuth credentials. Without a valid `REACT_APP_SPOTIFY_CLIENT_ID`, the app will load but Spotify login/search won't function. See `README.md` for the required variables.

### Running the application

| Command | Description |
|---------|-------------|
| `npm start` | Start the dev server on port 3000 |
| `npm test` | Run tests (Jest + Enzyme + Testing Library) |
| `npm run build` | Production build |
| `npx eslint src/ --ext .ts,.tsx` | Lint TypeScript source files |

### Key caveats

- The ESLint config is embedded in `package.json` under `eslintConfig` (extends `react-app` and `react-app/jest`).
- Tests run in CI mode with `--watchAll=false --ci` flags.
- One existing lint warning in `Dashboard.tsx` (unused `albums` variable) — this is pre-existing, not introduced by the agent.
- The app uses path aliases (`@assets/*`, `@styles/*`, `@redux/*`) resolved via `tsconfig.json` `baseUrl: "./src"`.
