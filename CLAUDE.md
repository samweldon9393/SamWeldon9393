# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Sam Weldon's personal portfolio site (sam-weldon.com). A hand-written static site — three HTML pages, one stylesheet, one JS file. No framework, no bundler, no tests, no linter. The only build step is Tailwind (see below); the generated CSS is committed, so the site is servable straight from the repo.

## Running it

Serve the repo root over HTTP (D3 and Alpine come from CDNs, so `file://` mostly works, but HTTP matches production):

```bash
python3 -m http.server 8000   # then http://localhost:8000
```

## Deployment

GitHub Pages serves the repo root of `main` directly; [CNAME](CNAME) maps it to sam-weldon.com. Pushing to `main` publishes. There is no CI.

## Styling / the Tailwind build

[pub/styles.css](pub/styles.css) is **generated output that is committed**, so GitHub Pages can serve the site with no build step. The source is [src/styles.css](src/styles.css). Edit the source, never the output:

```bash
npm install        # first time (or npm ci)
npm run build      # src/styles.css -> pub/styles.css
npm run watch      # same, rebuilding on change
```

`tailwindcss` is pinned to **3.4.15** exactly, which is the version the committed stylesheet was originally built with; `npm ci && npm run build` reproduces it byte-for-byte. Don't float that pin to a newer 3.4.x without rebuilding and eyeballing the diff — 3.4.15 is where `rgb(... / var(--tw-text-opacity, 1))` fallbacks appear, so older versions produce different output.

Commit `pub/styles.css` alongside any source change, or the live site won't pick it up.

Hand-written component classes live in the `@layer components` block at the bottom of `src/styles.css`, not in the markup: `.Card` / `.Link` / `.clickedLink` (nav), `.graph-bar` / `.hovered` (D3 bars), `.project-card` / `.project-frame` (index.html cards), `.gallery-item` (photos.html thumbnails), plus a `.hidden` hover tweak and `[x-cloak]`. Prefer extending those over repeating long utility strings across ten elements.

[tailwind.config.js](tailwind.config.js) defines the theme vocabulary: colors `deepBlue #010413`, `deeperBlue`, `coolOrange`, `myRed`, `deepRed`; fonts `Kanit` (body), `Outfit`, `SCPro`, `Oran`; spacing `400`/`480` (25rem/30rem, used by `.project-card`). Its `content` globs cover the three HTML pages and `src/js/**/*.js` — classes that only ever appear in JS string literals (`classList.add(...)`, D3's `.classed(...)`) are picked up from there, so keep new scripts under `src/js/`.

## Page structure

Three top-level pages — [index.html](index.html), [about.html](about.html), [photos.html](photos.html) — each with a **hand-duplicated header/nav block**. Nav or logo changes must be made in all three. The active page marks its own nav link with `class="clickedLink"` instead of `class="Link"`; sub-pages link back to `index.html#projects` / `index.html#contact`, while index.html uses bare `#projects` / `#contact`.

Every page loads KaTeX auto-render from a CDN — it exists to typeset the `\[ \overrightarrow{s}W\]` logo in the header. Each page's background container starts with a `<p aria-hidden="true">_</p>` spacer; it stops the first child's top margin from collapsing out of the background div. Don't "tidy" it away without checking the layout.

`index.html` groups project cards into three `<section>`s (App / Data / School) inside a single `#projects` wrapper, all sharing the 400x480 `.project-card` box. The two App cards add `.project-frame` and embed *live sandboxed iframes* of other GitHub Pages apps.

[photos.html](photos.html) uses Alpine.js (pinned to `3.x.x` via jsDelivr) for the lightbox. The component is registered as `Alpine.data('imageGallery', ...)` in a `<script>` in `<head>` that must run before Alpine's deferred bundle. Only `<img>` tiles open in the lightbox — the `<video>` tile plays in place, and `step()` cycles over the images only.

## JavaScript

[src/js/Coaches/graphs.js](src/js/Coaches/graphs.js) is the only script file — a classic (non-module) script loaded at the bottom of index.html; D3 v7 comes from a CDN in `<head>`. The ~250 lines of sentiment data are a `const coaches` array literal **inlined at the top of the file**; that is the data source, deliberately (a `fetch` would need a server). `chart()` renders into `#graph svg`, and hovering or tapping a bar rewrites the card's `<h4>`. `setUpInfoPanel()` swaps the graph for a write-up and back.

All DOM selectors in this file are scoped to the coach-graphs card (`#graph rect`, `#coach-graphs h4`) — keep them that way, since index.html contains other `<h4>`s and other cards.
