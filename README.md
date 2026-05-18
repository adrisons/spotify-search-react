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

## Getting Started

### Prerequisites

- Node.js 22+
- A Spotify Developer App ([create one here](https://developer.spotify.com/dashboard/))

### Setup

```bash
npm install
```

Create a `.env` file:

```
VITE_SPOTIFY_CLIENT_ID=<YOUR_APP_CLIENT_ID>
VITE_SPOTIFY_AUTHORIZE_URL=https://accounts.spotify.com/authorize
VITE_SPOTIFY_REDIRECT_URI=http://localhost:3000
```

### Development

```bash
npm run dev          # Start Vite dev server (port 3000)
npm run storybook    # Start Storybook (port 6006)
```

### Testing & Quality

```bash
npm run test         # Run tests with Vitest
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
```

### Build

```bash
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build
```
