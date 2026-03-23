# Portfolio

React + Vite + TypeScript portfolio with an Express server for contact feedback email.

## Prerequisites

- Node.js 18+ (recommended)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

   Or with Yarn:

   ```bash
   yarn install
   ```

2. Optional — for `/api/feedback` to send email via Gmail, create a `.env` in the project root:

   - `EMAIL_USER` — Gmail address
   - `EMAIL_PASS` — [app password](https://support.google.com/accounts/answer/185833) (not your normal login)

   Without these, feedback is logged on the server and the API still returns success.

## Run locally

```bash
npm run dev
```

Opens the app at [http://localhost:3000](http://localhost:3000) (Express serves Vite in dev).

## Production build

```bash
npm run build
```

Set `NODE_ENV=production` when running `server.ts` so it serves the `dist/` folder.
