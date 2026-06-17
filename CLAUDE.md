# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React Native news app (Expo) with a separate Express backend. The frontend fetches news from the backend, which proxies requests to the NewsAPI.

- **Frontend**: Expo + React Native (with web support via `react-native-web`)
- **Backend**: Express server in `api/`, deployed to Vercel
- **Styling**: GluestackUI for components, NativeWind (Tailwind) for utility classes

## Commands

### Frontend (root directory)

```bash
npm start          # Start Expo dev server
npm run web        # Start web-only
npm test           # Run Jest tests (watch mode)
npx jest           # Run Jest tests once (no watch)
npx expo export -p web  # Build for web (outputs to dist/)
npm run deploy     # Build + deploy to GitHub Pages
```

### Backend (`api/` directory)

```bash
cd api && npm start   # Start Express server on http://localhost:3000
```

## Architecture

### Data Flow

1. User interacts with `app/index.tsx` (root screen) — category tabs, search bar, date filter
2. State (`params`) is lifted to `index.tsx` and passed down to `NewsList`
3. `NewsList` calls `getArticles()` with a URL built from params, which fetches from the Express backend
4. The backend (`api/index.js`) proxies to NewsAPI and returns `{ articles: [...] }`

### API Endpoints (backend)

| Route | Description |
|---|---|
| `GET /api/news/category=:category` | Top headlines by category |
| `GET /api/news/newest` | Latest articles from Wired/CNN/NBC |
| `GET /api/news/search?query=&from=&to=` | Search articles with optional date range |

### Environment Variables

- **Frontend** (`.env` in root): `BASE_URL` — points to the deployed backend (Vercel). Loaded via `react-native-dotenv` and accessed through `app/env.ts` using the `@env` module alias.
- **Backend** (`api/.env`): `NEWS_API_KEY` — NewsAPI key.

In CI (GitHub Actions), `BASE_URL` is set via a repository variable (`vars.BASE_URL`).

### Key Patterns

- **Responsive layout**: `useResponsive()` hook (`app/hooks/UseResponsive.js`) returns `{ width, height, isMobile }` where `isMobile` is `width < 768`. Desktop shows a three-column layout (SideNews | NewsList | CalendarForm); mobile collapses to single column.
- **Article type**: Defined in `app/articles.ts` as the `Articles` interface — all components use this shared type.
- **Error handling**: `app/components/ErrorBoundary.tsx` wraps `NewsList` to catch fetch/render errors with a retry button.
- **Loading state**: `NewsList` manages `isLoading` state and passes it to `NewsDetail`, which renders a `LoadingSpinner` while fetching.

### Deployment

- **Frontend**: GitHub Actions (`.github/workflows/static.yml`) auto-deploys to GitHub Pages on push to `main` by running `expo export -p web` and uploading `dist/`.
- **Backend**: Deployed to Vercel (configured in `api/.vercel/`). The `serverless-http` wrapper in `api/index.js` enables serverless deployment; `app.listen` only runs when `NODE_ENV != "production"`.
