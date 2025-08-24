# Project Documentation

This folder contains all project-facing documentation for contributors and future you.

## Contents
- CONTENT_STRUCTURE.md — Canonical guide for content and media organization
- README.md — This document (overview, architecture, workflow, checklists)

## Architecture Overview

The app is a content-driven portfolio built with React + Vite + Tailwind + shadcn-ui. Content lives in markdown under `src/content/**` and media lives under `public/media/**`. A light content loader (`src/lib/content.ts`) parses front matter and exposes typed content to UI components.

<lov-mermaid>
graph TD
  A[Public Media /media/**] -->|absolute URLs| UI[UI Components]
  C[Markdown Content src/content/**] -->|front matter + body| L[Content Loader src/lib/content.ts]
  L --> UI
  UI --> P[Pages src/pages/**]
  P --> App[App Root src/App.tsx]
</lov-mermaid>

## Folder Structure (high level)

```
public/
  media/                 # All static assets served at /media/**
src/
  components/            # UI + feature components
    blogs/               # Blog/Podcast components (list, player, tags)
    shared/              # Reusable section pieces (banners, filters, headers)
    ui/                  # shadcn-ui primitives (customized)
  content/               # Markdown content (blogs, podcasts, projects, etc.)
  hooks/                 # Reusable hooks (toasts, share, mobile)
  lib/                   # Data helpers (content loader, domain data)
  pages/                 # Page sections rendered by App state
  index.css              # Design tokens + Tailwind layers
  main.tsx               # App bootstrap
  App.tsx                # Providers + page switching
```

See `docs/CONTENT_STRUCTURE.md` for detailed content front matter and media guidelines.

## Content Workflow
1. Add images/audio to `public/media/...` (use absolute paths like `/media/...`).
2. Create markdown in `src/content/blogs-podcasts/*.md` with front matter fields.
3. The list and detail views auto-pick up new content via `src/lib/content.ts`.

Tips:
- Prefer WebP/JPG; keep assets under ~200KB when possible.
- Use kebab-case filenames, descriptive `alt` text in markdown/images.

## Component Inventory (selected)
- Feature sections: HeroSection, ProjectsSection, PhotographySection, CodingSection, TestingSection, blogs/BlogSection
- Shared: SectionHeader, MediaBanner, FilterGroup, ShareButton
- UI (shadcn): button, card, badge, avatar, dialog, drawer, tooltip, select, table, tabs, accordion, toast/sonner, etc.

## Development
- Install: `pnpm install`
- Dev server: `pnpm dev`
- Lint: `pnpm run lint`
- Build: `pnpm run build`

## Test Pages
Explore examples in `src/pages/tests/**` for payment integrations and legacy flows (Accept.js, Hosted, DPM, etc.).

## Conventions
- Design system: use semantic tokens from `index.css` and `tailwind.config.ts`; avoid hard-coded colors.
- SEO: single H1, descriptive titles/descriptions, alt text, lazy images.
- Code: small, focused components; prefer composition over complexity.

## E2E Testing with Playwright
- Install: `pnpm install` then `pnpm exec playwright install --with-deps`
- Run tests: `pnpm exec playwright test`
- UI mode: `pnpm exec playwright test --ui`
- Headed mode: `pnpm exec playwright test --headed`
- View report: `pnpm exec playwright show-report`
- CI: GitHub Actions workflow at `.github/workflows/e2e.yml` starts the Vite dev server and runs the suite.

