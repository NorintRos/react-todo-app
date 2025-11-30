# react-todo-app

Opinionated, single-page task manager built with React + Vite. Tasks, settings, and theme live in `localStorage`, so the app runs fully in the browser without a backend.

## Features
- Create, edit, complete/uncomplete, and delete tasks with title, description, due date, priority, and category.
- Filter by priority, category text, status, and due date; dedicated Today, Completed, and Categories views.
- User settings (username, light/dark theme, default filter) persist locally and update the UI instantly.
- Responsive layout with reusable UI primitives, theme toggle, and React Router–based navigation.
- Placeholder login/onboarding pages so you can drop in a real auth flow later.

## Tech Stack & Architecture
- React 19 + React Router 7, bundled with Vite 7.
- State via React context: `TasksProvider` and `SettingsProvider`, each persisting to `localStorage`.
- Styling: `src/index.css` (themes, layout, components) plus light component-level classes.
- Utilities: `src/utils/dateUtils.js` for ISO date formatting and human-friendly due labels.

## Data Model & Behavior
- Task shape: `{ id, title, description, dueDate, priority, category, completed }` (IDs via `crypto.randomUUID()`).
- Settings shape: `{ theme, defaultFilter, username }`; defaults in `src/context/settingsDefaults.js`.
- Persistence: both tasks and settings read/write `localStorage`; clearing these keys resets state.
- Sorting: lists show incomplete tasks first; earlier due dates precede later/unscheduled tasks.
- Validation: past due dates are blocked in the task form to avoid accidental backdating.
- Local storage keys: `tasks` and `settings`.

## Views at a Glance
- Dashboard (`/`): add/edit tasks inline, filter by priority/category text/status/due, and quick-sort by completion/due date.
- Today (`/today`): tasks with `dueDate` set to today (read/write).
- Categories (`/categories`): filter by category value; shows all categories detected from tasks.
- Completed (`/completed`): completed tasks; edit/delete supported.
- Settings (`/settings`): change username, theme, default filter (updates live).
- Auth placeholders (`/login`, `/get-started`): swap in your auth flow when ready.

## Getting Started
Prerequisite: Node.js 20+ and npm.

1) Install dependencies:
```bash
npm install
```
2) Start the dev server (Vite prints a local URL, default :5173):
```bash
npm run dev
```

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build to `dist/`
- `npm run preview` – preview the production build locally
- `npm run lint` – lint source files (ESLint + Prettier config)
- `npm test` – run node-based tests (see `tests/`)

## Project Structure (high level)
- `src/App.jsx` – route map and app shell
- `src/pages/` – routed views (Dashboard, Today, Categories, Completed, Settings, auth placeholders)
- `src/components/` – tasks UI (form, list, filters), layout, and buttons
- `src/context/` – providers for tasks/settings with `localStorage` persistence
- `src/utils/` – shared helpers (dates)
- `public/` – static assets; `_redirects` for SPA routing on Cloudflare Pages

## Extending the App
- Add a task field: update the reducer in `TasksContext.jsx`, form defaults/inputs in `TaskForm.jsx`, display in `TaskItem.jsx`, and optional sorting/filtering in `TaskList.jsx` or filters.
- Change themes: adjust CSS variables in `src/index.css`; `SettingsContext` toggles the `data-theme` attribute on `<html>`.
- Adjust navigation: edit routes in `src/App.jsx` and links in `src/components/layout/NavBar.jsx`.

## Testing & Linting
- Unit tests: `npm test` (Node test runner). Example: `tests/dateUtils.test.js` covers due-date helpers.
- Linting: `npm run lint` uses ESLint (React, hooks, and Prettier config). Run before committing to catch regressions.


