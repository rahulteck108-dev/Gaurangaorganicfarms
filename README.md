# Gaurangaorganicfarms Hello

## Deploy the Node.js backend to Render

The Render logs showing `npm start` are for the Node.js/SQLite backend at the
repository root. The root `render.yaml` configures a Render Blueprint for it.
The app listens on Render's assigned `PORT`, and `.gitignore` keeps local
native Node modules out of future deploys; Render must install its own
Linux-compatible dependencies with `npm ci`. The project pins the service to
Node 22 for a consistent runtime.

To update the existing Render service manually, set its root directory to the
repository root, build command to `npm ci`, and start command to
`npm start`. Alternatively, sync the Blueprint from `render.yaml`.

SQLite files on Render's default filesystem are temporary and may be lost when
the service restarts or redeploys. Use a persistent disk or a hosted database
before relying on this service for production data.

For a separately hosted React frontend, set the build-time
`VITE_API_BASE_URL` variable to the Render service URL and rebuild the
frontend. Local development defaults to `https://gaurangaorganicfarms.onrender.com`.
