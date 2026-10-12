# Octofit Tracker presentation tier

The React 19 and Vite frontend uses React Router for navigation and reads its
collections from the backend API on port 8000.

## API configuration

In GitHub Codespaces, define `VITE_CODESPACE_NAME` so the frontend can build the
backend URL as `https://<codespace-name>-8000.app.github.dev`. For local
development, add the following to `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Replace the example value with the Codespace name. Vite loads `.env.local` when
the development server starts, so restart it after changing this file. When
`VITE_CODESPACE_NAME` is unset or blank, the frontend safely uses
`http://localhost:8000`.

The frontend reads activities, leaderboard entries, teams, users, and workouts
from `/api/activities/`, `/api/leaderboard/`, `/api/teams/`, `/api/users/`, and
`/api/workouts/`. It accepts both plain JSON arrays and paginated responses
containing a `results`, `data`, `items`, or `docs` array.
