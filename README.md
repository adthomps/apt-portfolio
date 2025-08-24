# Portfolio App — React + Vite + Tailwind + shadcn-ui
#

## Major Frameworks & Technologies

This project uses the following major frameworks and technologies:

- **Vite**: Fast build tool and development server for modern web projects.
- **React**: UI library for building interactive user interfaces.
- **Hono**: Lightweight, fast web framework for edge/serverless environments (used for API/server logic).
- **Cloudflare**: Deployment platform using Cloudflare Pages/Workers (see `wrangler.toml`).
- **TypeScript**: Static typing for JavaScript.
- **shadcn/ui**: UI component library (see `components.json`).
- **Tailwind CSS**: Utility-first CSS framework for styling.

A modular, content-driven portfolio with Blogs & Podcasts, Projects, Photography, and Testing playgrounds. Built for fast iteration and clean content workflows.

- Live Project: https://lovable.dev/projects/d1c116a8-e616-45f2-97e1-e3756995c553

## Quick Start
```bash
pnpm install
pnpm dev
```

For a full list of development, testing, and deploy commands, see `COMMANDS.md` in the project root.

## Project Structure

```text
public/
  media/                 # All static assets served at /media/**
src/
  components/            # Feature sections + shadcn-ui components
    blogs/               # Blog/Podcast list, player, tags
    shared/              # SectionHeader, MediaBanner, FilterGroup, ShareButton
    ui/                  # shadcn primitives (accordion, alert, button, ...)
  content/               # Markdown content (blogs-podcasts, projects, ...)
  hooks/                 # use-toast, use-share, use-mobile
  lib/                   # content loader and domain libs
  pages/                 # Page containers composed in App.tsx
  index.css              # Design tokens & Tailwind layers
  main.tsx               # App bootstrap
  App.tsx                # Providers + page switching
```


## Content & Media

- Markdown lives under `src/content/**`
- Media lives under `public/media/**`
- Use absolute paths in front matter like `/media/blogs-podcasts/blog1-hero-a.png`
- Read time auto-computed if omitted


## Tech Stack

- React 18, TypeScript, Vite
- Tailwind CSS + tailwindcss-animate
- shadcn-ui (Radix primitives with Tailwind variants)
- @tanstack/react-query for data fetching/state
- react-markdown + remark/rehype plugins for content



## Dependencies (grouped)

- UI/UX: `lucide-react`, `sonner`
- shadcn/Radix: `@radix-ui/*`, `class-variance-authority`, `tailwind-merge`, `clsx`
- Markdown: `react-markdown`, `remark-gfm`, `remark-directive`, `rehype-slug`, `rehype-autolink-headings`, `front-matter`, `gray-matter`, `react-syntax-highlighter`
- Data & Charts: `@tanstack/react-query`, `recharts`, `embla-carousel-react`, `date-fns`
- Forms/Validation: `react-hook-form`, `zod`, `@hookform/resolvers`
- Routing: `react-router-dom`

See package.json for versions; all are already installed in this project.


## Components Inventory (selected)

- Feature: `HeroSection`, `ProjectsSection`, `PhotographySection`, `CodingSection`, `TestingSection`, `blogs/BlogSection`, `blogs/AudioPlayer`, `blogs/TagGroups`
- Shared: `SectionHeader`, `MediaBanner`, `FilterGroup`, `ShareButton`
- UI (shadcn): `accordion`, `alert-dialog`, `avatar`, `badge`, `button`, `card`, `carousel`, `chart`, `dialog`, `drawer`, `form`, `input`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `slider`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toggle`, `tooltip`


## Adding Blogs/Podcasts

1. Place images/audio under `public/media/blogs-podcasts/`
2. Create a markdown file in `src/content/blogs-podcasts/` with required front matter (see docs/CONTENT_STRUCTURE.md)
3. The homepage list and detail view will update automatically

## Development & Quality

- Lint: `pnpm run lint`
- Build: `pnpm run build`
- Design system: use semantic tokens defined in `index.css` and `tailwind.config.ts`; avoid raw color values
- Accessibility: single H1 per page, alt text on images, keyboard-friendly components

### E2E Testing (Playwright)

- Install browsers: `pnpm exec playwright install --with-deps`
- Run tests: `pnpm exec playwright test`
- UI mode: `pnpm exec playwright test --ui`
- Headed mode: `pnpm exec playwright test --headed`
- Report: `pnpm exec playwright show-report`

## Notes

- Unused legacy images under `src/assets/` were removed; store all runtime assets under `public/media/**`.
- Supabase is enabled for future backend needs, but not yet used in this app.

## SEO & Sitemap

This project generates a `public/sitemap.xml` at build time and injects per-page SEO tags for OpenGraph, Twitter, and JSON-LD.

Setup:

1. Copy `.env.example` to `.env` and set `SITE_URL` to your production domain (e.g., `https://apt.example.com`).
2. Run the sitemap manually if needed:

```powershell
pnpm run sitemap
```

The build pipeline runs it automatically via `prebuild`.

Per-page meta tags are handled by `src/components/shared/SEO.tsx`, used in:

- `src/pages/Index.tsx`
- `src/pages/ProfilePage.tsx`
- `src/pages/ContentDetailPage.tsx`

`public/robots.txt` references the sitemap; ensure the URL matches your domain.

## GitHub + Cloudflare Setup

This repo is pre-wired for CI and Cloudflare Workers deploys.

1. Environment

- Copy `.env.example` to `.env` and set:
  - `SITE_URL` to your public domain or Workers.dev URL
  - Optional: `VITE_RECENT_WINDOW_DAYS` (default 60)
  - Optional: `PW_BASE_URL` for Playwright (defaults to production; CI sets localhost)

1. GitHub Secrets (Repository Settings → Secrets and variables → Actions)

- `CLOUDFLARE_ACCOUNT_ID` — your account ID
- `CLOUDFLARE_API_TOKEN` — API token with Workers deploy permissions (scoped to your account)

1. CI workflow

- File: `.github/workflows/ci.yml`
- Runs lint, typecheck, unit tests, and Playwright E2E against a local dev server.
- Override base URL with `PW_BASE_URL` if needed.

1. Deploy workflow

- File: `.github/workflows/deploy.yml`
- On push to `main`, deploys via `cloudflare/wrangler-action@v3` using `wrangler.toml`.

1. Playwright base URL

- Configure by env: `PW_BASE_URL=http://localhost:5173 pnpm exec playwright test`
- If unset, default is your Workers.dev URL.

Notes

- For Pages deploys instead of Workers, switch the action command per Cloudflare docs.
- Do not commit real secrets; use GitHub Secrets or Wrangler Secrets for runtime bindings.

### Content Status & Recency

- Recent window is configurable via `VITE_RECENT_WINDOW_DAYS` (default `60`).
- You can override classification with frontmatter:

```yaml
---
Status: scheduled # or published | archived
---
```

### Unit tests

Run unit tests for date classification helpers (requires Vitest installed):

```powershell
pnpm add -D vitest
pnpm exec vitest run
```
