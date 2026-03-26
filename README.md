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

   - `EMAIL_USER` — your full Gmail address (same account that owns the inbox)
   - `EMAIL_PASS` — a **[Gmail App Password](https://support.google.com/accounts/answer/185833)** (16 characters). You must turn on **2-Step Verification** first, then create an app password under **Google Account → Security → App passwords**.  
     **Gmail does not accept your normal sign-in password** for SMTP; if you see `535 BadCredentials` in the server logs, replace `EMAIL_PASS` with a new app password. You can paste it with or without spaces.

   Without `EMAIL_USER` / `EMAIL_PASS`, feedback is only logged in the terminal and the API still returns success.

## Run locally

```bash
npm run dev
```

Opens the app at [http://localhost:3000](http://localhost:3000) (Express serves Vite in dev).

## Production build

```bash
npm run build
```

Set `NODE_ENV=production` when running `tsx server/index.ts` so it serves the `dist/` folder.
