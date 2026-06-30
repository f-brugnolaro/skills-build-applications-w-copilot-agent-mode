# Octofit Tracker Frontend

React 19 + Vite presentation tier for the Octofit Tracker application.

## Environment

Define `VITE_CODESPACE_NAME` before running the frontend in GitHub Codespaces so the app can call the backend through the public forwarded port.

Example `.env.local`:

```ini
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs in this form:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/<resource>/
```

If `VITE_CODESPACE_NAME` is unset, the frontend falls back safely by deriving the codespace name from the browser hostname when possible, otherwise it uses `http://localhost:8000/api`.

## Scripts

- `npm run dev --prefix octofit-tracker/frontend`
- `npm run build --prefix octofit-tracker/frontend`
- `npm run lint --prefix octofit-tracker/frontend`
