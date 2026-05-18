# Spotify Search React

A Spotify search application built with **React 19**, **Vite**, **Tailwind CSS v4**, **Redux Toolkit**, and **TypeScript**.

## Architecture

The project follows a **clean architecture in layers**:

```
src/
├── domain/              # Domain models and types
│   └── models/          # Artist, Track, PaginatedResult
├── infrastructure/      # External integrations (API layer)
│   ├── http/            # Generic HTTP client
│   └── spotify/         # Spotify API & auth integration
├── application/         # Application state and business logic
│   └── store/           # Redux Toolkit store (session, ui)
├── ui/                  # Presentation layer
│   ├── components/      # Reusable presentational components
│   └── pages/           # Page-level container components
├── config/              # App configuration (OAuth, env)
└── test/                # Test setup and utilities
```

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| State | Redux Toolkit + redux-persist |
| Routing | React Router v7 |
| Testing | Vitest + Testing Library |
| Components | Storybook 8 |
| Linting | ESLint 9 (flat config) |
| Package Manager | pnpm |

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm (`corepack enable` or `npm install -g pnpm`)
- A Spotify Developer App ([create one here](https://developer.spotify.com/dashboard/))

### Setup

```bash
pnpm install
```

Create a `.env` file:

```
VITE_SPOTIFY_CLIENT_ID=<YOUR_APP_CLIENT_ID>
VITE_SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000
```

> **Note:** Spotify requires `http://127.0.0.1:3000` (not `localhost`) for HTTP redirect URIs. Make sure this exact URI is added in your Spotify Developer App settings.

### Development

```bash
pnpm dev          # Start Vite dev server (port 3000)
pnpm storybook    # Start Storybook (port 6006)
```

### Testing & Quality

```bash
pnpm test         # Run tests with Vitest
pnpm test:watch   # Run tests in watch mode
pnpm lint         # Run ESLint
```

### Build

```bash
pnpm build        # TypeScript check + Vite production build
pnpm preview      # Preview production build
```
