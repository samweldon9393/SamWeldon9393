# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Sam Weldon's personal portfolio site (sam-weldon.com): React 19 + TypeScript, built by Vite, styled with Tailwind, deployed to GitHub Pages by Actions. Three routes — home, about, photos.

## Commands

```bash
npm install        # or npm ci
npm run dev        # Vite dev server with HMR
npm run build      # typecheck, then bundle to dist/
npm run check      # typecheck + smoke (what CI runs)
npm run typecheck  # tsc --noEmit
npm run smoke      # render every route in Node and assert its content
npm run preview    # serve the built dist/ locally
npm run logo       # regenerate the KaTeX site mark (rarely needed)
```

There is no unit-test framework. `npm run smoke` ([scripts/smoke.mjs](scripts/smoke.mjs)) is the safety net: it SSRs each route via [scripts/ssr-entry.tsx](scripts/ssr-entry.tsx) and fails if a page throws, a route stops matching, or expected content vanishes. Add a needle there when you add a page. It catches what `tsc` cannot, so run it after component changes.

## Content lives in data, not markup

The pages are thin. Everything you would normally want to edit is a typed array in [src/data/](src/data/):

- [projects.ts](src/data/projects.ts) — the whole Projects section. `Project` is a discriminated union on `kind` (`embed` | `video` | `video-series` | `chart`); [ProjectCard.tsx](src/components/projects/ProjectCard.tsx) switches on it. **Adding a project is a data edit.** Adding a new *kind* of card means adding a union variant plus a case — TypeScript will point at the switch if you forget.
- [photos.ts](src/data/photos.ts) — gallery tiles, images and videos.
- [site.ts](src/data/site.ts) — nav items, social links, tagline, resume URL.
- [coaches.ts](src/data/coaches.ts) — the ~36 rows behind the D3 chart, inlined deliberately so the graph needs no fetch.

Prefer extending the data and its types over hard-coding markup in a page.

## Routing and GitHub Pages

React Router with real paths (`/`, `/about`, `/photos`). Pages has no SPA rewrite, so two things make deep links work, and **both must survive any build change**:

1. [vite.config.ts](vite.config.ts) copies `dist/index.html` to `dist/404.html` after the bundle. Pages serves 404.html for unknown paths, which boots the app and lets the router resolve the URL.
2. `public/about.html` and `public/photos.html` are redirect stubs for the site's pre-React URLs. Don't delete them; old links and search results still point there.

`public/CNAME` carries the custom domain into `dist/` — losing it drops sam-weldon.com back to the github.io address.

Anchor links (`/#projects`, `/#contact`) only scroll natively on a full load, so [ScrollToHash.tsx](src/components/ScrollToHash.tsx) does it on client-side navigation.

Deploys run from [.github/workflows/deploy.yml](.github/workflows/deploy.yml) on push to `main`: `npm ci` → `npm run check` → `npm run build` → upload `dist/` → `actions/deploy-pages`. **This requires Settings → Pages → Source set to "GitHub Actions".** If that is ever switched back to a branch, deploys silently stop reaching the site.

## Styling

Tailwind, compiled by Vite through PostCSS. [src/index.css](src/index.css) is the only stylesheet; nothing generated is committed any more.

`tailwindcss` is pinned to **3.4.15**. Moving to v4 is a real migration, not a version bump: v4 drops the `bg-opacity-*` utilities this design uses on the header and video cards, renames the shadow scale, and replaces `tailwind.config.js` with CSS-first `@theme`. Do it as its own change, with a visual pass.

Hand-written component classes live in the `@layer components` block of `src/index.css`: `.Card` / `.Link` / `.clickedLink` (nav), `.graph-bar` / `.hovered` (chart bars), `.project-card` / `.project-frame` (the fixed 400x480 cards), `.gallery-item` (photo tiles). Reach for these instead of repeating twenty-class strings across ten elements.

[tailwind.config.js](tailwind.config.js) holds the theme vocabulary: `deepBlue #010413`, `deeperBlue`, `coolOrange`, `myRed`, `deepRed`; fonts `Kanit` (body), `Outfit`, `SCPro`, `Oran`; spacing `400`/`480` (25rem/30rem, used by `.project-card`). Its `content` globs are `index.html` and `src/**/*.{ts,tsx}` — a class assembled from string fragments at runtime won't be seen by the scanner and won't be emitted.

## Two things that look odd but are deliberate

**The site mark.** [src/components/logoMarkup.ts](src/components/logoMarkup.ts) is generated HTML, committed on purpose. KaTeX is ~260 kB of JavaScript and the logo is one constant formula, so [scripts/render-logo.mjs](scripts/render-logo.mjs) renders it at build time and only the KaTeX stylesheet ships. Regenerate with `npm run logo`; don't hand-edit the file.

**The `_` spacer** in [Layout.tsx](src/components/Layout.tsx). Without it the first child's top margin collapses through the starfield container and the background starts too low. Pages with their own top padding pass `spacer={false}`.

## The chart

[CoachGraph.tsx](src/components/CoachGraph.tsx) draws SVG directly from `d3-scale` and `d3-array` — React owns the DOM, D3 only computes scales. There is no `d3-selection` or `d3-axis`; the y-axis ticks are rendered by hand to match what `axisLeft` produced. If you extend it, keep that split: no imperative D3 DOM mutation inside React.
