# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Sam Weldon's personal portfolio site (sam-weldon.com): React 19 + TypeScript, built by Vite, styled with Tailwind, deployed to GitHub Pages by Actions. Three routes — home, about, photos.

The look is a dark, near-black surface with one warm accent (`#F97559`), Outfit for display type and Inter for body, generous vertical rhythm, and content that fades up as it scrolls into view.

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

- [projects.ts](src/data/projects.ts) — the whole Work section. `Project` is a discriminated union on `kind` (`embed` | `video` | `video-series` | `chart` | `writing`) over a shared `ProjectBase` of `id` / `title` / `blurb`; [ProjectCard.tsx](src/components/projects/ProjectCard.tsx) switches on it. **Adding a project is a data edit.** Adding a new *kind* of card means adding a union variant plus a case — TypeScript will point at the switch if you forget. `isWideProject()` in the same file decides which kinds span the full grid width instead of one column.
- [photos.ts](src/data/photos.ts) — gallery tiles, images and videos.
- [site.ts](src/data/site.ts) — nav items, social links, tagline, resume URL.
- [coaches.ts](src/data/coaches.ts) — the ~36 rows behind the D3 chart, inlined deliberately so the graph needs no fetch.

Prefer extending the data and its types over hard-coding markup in a page.

## Routing and GitHub Pages

React Router with real paths (`/`, `/about`, `/photos`). Pages has no SPA rewrite, so two things make deep links work, and **both must survive any build change**:

1. [vite.config.ts](vite.config.ts) copies `dist/index.html` to `dist/404.html` after the bundle. Pages serves 404.html for unknown paths, which boots the app and lets the router resolve the URL.
2. `public/about.html` and `public/photos.html` are redirect stubs for the site's pre-React URLs. Don't delete them; old links and search results still point there.

`public/CNAME` carries the custom domain into `dist/` — losing it drops sam-weldon.com back to the github.io address.

Anchor links (`/#work`, `/#contact`) only scroll natively on a full load, so [ScrollToHash.tsx](src/components/ScrollToHash.tsx) does it on client-side navigation.

Deploys run from [.github/workflows/deploy.yml](.github/workflows/deploy.yml) on push to `main`: `npm ci` → `npm run check` → `npm run build` → upload `dist/` → `actions/deploy-pages`. **This requires Settings → Pages → Source set to "GitHub Actions".** If that is ever switched back to a branch, deploys silently stop reaching the site.

## Styling and the design system

Tailwind, compiled by Vite through PostCSS. [src/index.css](src/index.css) is the only stylesheet; nothing generated is committed.

**Use the component classes rather than restating utilities.** They are defined in the `@layer components` block of `src/index.css`, and consistency across pages depends on going through them:

| Class | For |
| --- | --- |
| `.container-page` | page gutter + max width; every section uses it |
| `.eyebrow` | small mono uppercase label above a heading |
| `.heading-xl` / `.heading-lg` / `.heading-md` | the display type scale |
| `.body-muted` | secondary prose |
| `.btn-primary` / `.btn-ghost` | the two button styles |
| `.card` / `.card-hover` | surface panel; the border does the work, not a shadow |
| `.nav-link` / `.nav-link-active` | header nav with the growing underline |
| `.tile` | photo thumbnails |

Colour tokens live in [tailwind.config.js](tailwind.config.js): `ink` (page), `surface` / `surfaceHi` (panels), `accent` / `accentSoft`, `muted` (secondary text). Borders are plain `white/10`-style alphas, which read better on near-black than fixed greys. Fonts: `font-sans` (Inter, the default), `font-display` (Outfit), `font-mono` (Source Code Pro) — only those three families are loaded in [index.html](index.html), down from seven.

Motion is centralised: `animate-fade-up` plus the [Reveal](src/components/Reveal.tsx) wrapper (IntersectionObserver, stagger via `delay`), and a `prefers-reduced-motion` block in `index.css` that flattens every animation and transition site-wide. Don't add bespoke transition durations that bypass it.

`tailwindcss` is pinned to **3.4.15**. Moving to v4 is a real migration, not a version bump: v4 replaces `tailwind.config.js` with CSS-first `@theme` and renames parts of the scale. Do it as its own change, with a visual pass.

The `content` globs are `index.html` and `src/**/*.{ts,tsx}` — a class assembled from string fragments at runtime won't be seen by the scanner and won't be emitted.

## Component layout

- [Layout.tsx](src/components/Layout.tsx) — the shell every page shares: [Backdrop](src/components/Backdrop.tsx), fixed [Header](src/components/Header.tsx), content, [Footer](src/components/Footer.tsx).
- [Backdrop.tsx](src/components/Backdrop.tsx) — ambient background: colour washes, the old starfield kept as a faint drifting texture, and an SVG grain layer that stops the large flat areas banding.
- [Section.tsx](src/components/Section.tsx) — eyebrow + heading + content, the standard page section.
- [CardShell.tsx](src/components/projects/CardShell.tsx) — the frame every project card shares: a 16:10 media well, then title, blurb, action. This is what makes six very different projects read as one set; new card kinds should use it rather than rolling their own box.

## Two things that look odd but are deliberate

**The site mark.** [src/components/logoMarkup.ts](src/components/logoMarkup.ts) is generated HTML, committed on purpose. KaTeX is ~260 kB of JavaScript and the logo is one constant formula, so [scripts/render-logo.mjs](scripts/render-logo.mjs) renders it at build time and only the KaTeX stylesheet ships. Regenerate with `npm run logo`; don't hand-edit the file.

**No SVG `<title>` elements.** React 19 hoists `<title>` into the document head as page metadata, wherever it is rendered — an SVG `<title>` used for an accessible name silently becomes the browser tab title. Use `aria-label` on the `<svg>` instead. `npm run smoke` asserts that no `<title>` reaches the body, because this fails quietly.

## The chart

[CoachGraph.tsx](src/components/CoachGraph.tsx) draws SVG directly from `d3-scale` and `d3-array` — React owns the DOM, D3 only computes scales. There is no `d3-selection` or `d3-axis`. It is responsive via `viewBox`, uses light gridlines instead of tick marks, and dims the other bars when one is hovered; the readout under the chart has a reserved min-height so hovering never shifts the layout. If you extend it, keep that split: no imperative D3 DOM mutation inside React.
