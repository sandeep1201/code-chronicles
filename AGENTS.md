# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Code Chronicles is a single **Next.js 16 (App Router) + React 19 + TypeScript** app (a personal blog/learning platform). There is no database and no backend service separate from Next.js — all content is file-based (MDX/JSON under `content/`, `data/`). API routes (`app/api/*`) run in-process. No secrets are required to run, build, or test the site.

### Running / building (standard commands, see `package.json` and `README.md`)
- Dev server: `npm run dev` (http://localhost:3000, Turbopack). This is the way to run the product for development.
- Production build: `npm run build`; serve with `npm run start`.
- Lint: `npm run lint`. Type check: `npx tsc --noEmit`.

### Non-obvious notes
- `npm run lint` currently reports **pre-existing errors and warnings** in committed code (e.g. `react-hooks/static-components`, several `no-unused-vars`). These are not environment problems — do not "fix" them as part of unrelated work.
- The build prints `Quiz component rendering, quizId: ...` log lines during static generation; this is existing app logging, not an error.
- Node 22 (system default) works for dev/build even though Netlify/CI pin Node 20 (`netlify.toml`, `.github/workflows/`). No nvm switch is needed.
- The `/trading` page + `/api/ibs-scan` route call Yahoo Finance live at request time (public, no credentials); they fail gracefully if the network is unreachable. The rest of the site is fully functional offline.
- The `scripts/` automation (X/Twitter, LinkedIn, Garmin sync via `scripts/requirements.txt`) is **out-of-band** and not part of serving the site. It needs credentials in a gitignored `.env` and is optional for developing/testing the web app. `package.json` references `scripts/fetch-market-data.ts` which does not exist.
