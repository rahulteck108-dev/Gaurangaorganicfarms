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

## Customer email notifications

The backend sends a welcome email after signup, a notice after every successful
login, and an order confirmation after an order is saved. It uses the existing
Resend HTTPS API integration. Configure these variables in the backend's local
environment or Render service settings:

- `RESEND_API_KEY`: a Resend API key; keep it private and do not commit it.
- `MAIL_FROM`: a sender address on a domain verified in Resend, for example
  `Gauranga Organic Farm <orders@your-verified-domain.com>`.
- `OWNER_EMAIL` (optional): receive a copy of new order notifications.

Verify your sending domain and add the variables to Render's Environment
settings before expecting customer emails. Until configured, signup, login, and
order actions still complete, but the API reports that the email was not sent.
The order response includes `emailStatus`: `not_configured` means the backend
is missing `RESEND_API_KEY` or `MAIL_FROM`; `provider_rejected` means Resend
rejected the configured sender or request; `provider_unavailable` indicates a
network/provider timeout. Check the Render logs for the corresponding reason.
Order notifications include delivery details only and never include card or
UPI credentials. Both the React and static storefront flows use these backend
notifications.

For local development, copy `.env.example` to `.env`, replace the placeholders
with your Resend values, and run `npm start`. `.env` is ignored by Git.
