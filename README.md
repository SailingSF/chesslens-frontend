# chesslens-frontend

Marketing landing page for **[ChessLens](https://chesslens.ai)** — a chess analysis and learning tool that pairs Stockfish + a trained move classifier with AI-generated narration that explains *why* a move was good or bad, calibrated to the player's level (target ELO 600–1800).

Two product tiers the site speaks to:

- **Open-source core** — the full analysis pipeline (Django), self-hostable from [`SailingSF/chesslens-core`](https://github.com/SailingSF/chesslens-core). MIT licensed.
- **Hosted cloud** (coming soon) — the paid tier. The landing page collects waitlist signups.

This repo is **only the marketing site**. The analysis pipeline, auth, and dashboards live elsewhere.

## Stack

Vite + React 18 + TypeScript (strict). Single `src/landing.css` with `cl-`-prefixed classes and design tokens on `.cl-root`. See [`CLAUDE.md`](./CLAUDE.md) for architecture details.

## Commands

```bash
npm install
npm run dev      # Vite dev server on :5173
npm run build    # tsc -b && vite build
npm run lint     # ESLint flat config
npm run preview  # serve the production build locally
```

Typecheck without emit: `npx tsc --noEmit -p tsconfig.app.json`. No test runner is configured.

## Deployment — Cloudflare Pages

The site deploys to Cloudflare Pages at **chesslens.ai**.

**Build settings:**

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(leave blank)* |
| Node version | `20` (set `NODE_VERSION=20` in env vars if the default differs) |

**SPA routing:** the landing page is currently a single route, but if client-side routes are added later, add a `public/_redirects` file with `/*  /index.html  200` so deep links resolve.

**Custom domain:** point `chesslens.ai` (and `www`) at the Pages project in the Cloudflare dashboard. Cloudflare handles TLS automatically.

**Preview deployments:** every non-`master` branch gets a preview URL. `master` publishes to production.
