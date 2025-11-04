# Recipe Explorer Frontend (Ocean Professional)

A modern, responsive React frontend for browsing, searching, and managing recipes. Implements the Ocean Professional style with blue primary and amber accents.

## Features

- Header navigation with action to create recipes
- Left-hand category menu
- Recipe list: search bar, tags, thumbnails
- Recipe detail: hero image, ingredients, instructions, tags, edit/delete
- Accessible modal forms for create/edit with validation
- API client uses REACT_APP_API_BASE or REACT_APP_BACKEND_URL; falls back to relative `/api`
- Built-in mock API when `REACT_APP_FEATURE_FLAGS=mock`
- Responsive layout with subtle gradients, rounded corners, and shadows

## Getting Started

- Install dependencies:
  - `npm install`
- Start dev server:
  - `npm start` (http://localhost:3000)
- Run tests in CI mode:
  - `npm test`
- Build for production:
  - `npm run build`

## Environment Variables

Define in `.env` (see `.env.example`):
- REACT_APP_API_BASE: Base URL for backend API (e.g., https://api.example.com)
- REACT_APP_BACKEND_URL: Alternative base URL if REACT_APP_API_BASE not set
- REACT_APP_FEATURE_FLAGS: Comma-separated flags, include `mock` or `mock-api` to enable mock service

Other supported (optional):
- REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV, REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH, REACT_APP_EXPERIMENTS_ENABLED

Example:
```
REACT_APP_API_BASE=
REACT_APP_BACKEND_URL=
REACT_APP_FEATURE_FLAGS=mock
```

## API Contract

The app expects the following REST endpoints (when not using mock mode):
- GET `/recipes?q=&category=`
- GET `/recipes/:id`
- POST `/recipes`
- PUT `/recipes/:id`
- DELETE `/recipes/:id`

## Routing

- `/` — Recipe list with search and category filter
- `/recipes/:id` — Recipe detail view

## Styling

- Theme variables are applied in `src/theme.js` via `applyThemeCSSVars()`
- Component styles reside in `src/styles.css`
- Colors:
  - Primary: `#2563EB`
  - Secondary/Accent: `#F59E0B`
  - Error: `#EF4444`
  - Background: `#f9fafb`
  - Surface: `#ffffff`
  - Text: `#111827`

## Accessibility

- Modal includes keyboard support (ESC to close) and ARIA semantics
- Focus-visible rings on inputs and interactive elements
- Semantic structure for navigation, lists, and sections

## Project Structure (key files)

- `src/App.js` — App shell with Router and modals
- `src/styles.css` — Global themed styles
- `src/theme.js` — Ocean Professional theme and variable injection
- `src/api/client.js` — API client with mock fallback
- `src/context/RecipeContext.js` — Lightweight global state for recipes
- `src/components/*` — UI components (Header, LeftMenu, RecipeList, RecipeDetail, Modal, RecipeForm)
- `src/pages/*` — Page-level containers (Home, Detail)
