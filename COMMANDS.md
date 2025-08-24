# Commands Cheat Sheet

All commands are written for Windows PowerShell.

## Dev

```powershell
# Start dev server
pnpm dev

# Lint, typecheck, and unit tests
pnpm check
```

## Unit tests (Vitest)

```powershell
# Run unit tests once
pnpm test:unit

# Watch mode
pnpm test:unit:watch
```

## E2E tests (Playwright)

```powershell
# Run E2E
pnpm test:e2e

# UI mode
pnpm exec playwright test --ui

# Headed mode
pnpm exec playwright test --headed

# Show last report
pnpm exec playwright show-report
```

## Build and preview

```powershell
# Ensure environment (replace with your domain)
$env:SITE_URL = "https://apt-portfolio.apt-account.workers.dev/"
$env:VITE_RECENT_WINDOW_DAYS = "60"

# Build (runs sitemap prebuild step automatically)
pnpm build

# Preview local build
pnpm preview
```

## Sitemap

```powershell
# Generate sitemap manually (writes public/sitemap.xml)
pnpm sitemap
```

Note: The generator reads `SITE_URL` from your `.env` (or current shell env). If `SITE_URL` is missing, the script fails fast.

## Deploy (Cloudflare Workers)

```powershell
# Make sure env is set for the shell session or in Cloudflare settings
$env:SITE_URL = "https://apt-portfolio.apt-account.workers.dev/"
$env:VITE_RECENT_WINDOW_DAYS = "60"

# Deploy via Wrangler
pnpm deploy
```

## Environment variables

- `SITE_URL`: absolute origin used to build sitemap URLs
- `VITE_RECENT_WINDOW_DAYS`: number of days to consider an item "Recent" (default: 60)

## Notes

- `pnpm build` automatically runs the sitemap generator via `prebuild`.
- The Blog section respects frontmatter `Status: scheduled|published|archived` and `VITE_RECENT_WINDOW_DAYS`.
