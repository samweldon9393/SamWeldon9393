# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Sam Weldon's personal portfolio site (sam-weldon.com). A hand-written static site — three HTML pages, one stylesheet, one JS file. No framework, no bundler, no package.json, no tests, no linter.

## Running it

Serve the repo root over HTTP (D3 and Alpine come from CDNs, so `file://` mostly works, but HTTP matches production):

```bash
python3 -m http.server 8000   # then http://localhost:8000
```

## Deployment

GitHub Pages serves the repo root of `main` directly; [CNAME](CNAME) maps it to sam-weldon.com. Pushing to `main` publishes. There is no CI.

## The Tailwind situation (most important gotcha)

[pub/styles.css](pub/styles.css) is **committed compiled Tailwind v3 output**, and the build inputs are not in the repo — no `package.json`, no `src/styles.css` with the `@tailwind` / `@layer components` source. Only [tailwind.config.js](tailwind.config.js) survives.

Consequences:

- Adding a Tailwind utility class to an HTML file does nothing unless that exact class already appears in `pub/styles.css`. Grep before you use one: `grep -n '^\.md\\:my-2{' pub/styles.css`.
- The hand-authored component classes — `.Card`, `.Link`, `.clickedLink`, `.graph-bar`, `.hovered` (near the end of the file) — exist only as compiled rules. Their `@apply` source is gone.
- For a small change, hand-editing `pub/styles.css` is the pragmatic move. To regenerate properly you must first recreate `src/styles.css` and a Tailwind v3 toolchain, then `npx tailwindcss -i src/styles.css -o pub/styles.css`, and check that the component classes survive.
- `tailwind.config.js` defines the theme vocabulary: colors `deepBlue #010413`, `deeperBlue`, `coolOrange`, `myRed`, `deepRed`; fonts `Kanit` (body), `Outfit`, `SCPro`, `Oran`; spacing `400`/`480` (25rem/30rem).

Because of this, page-specific layout that Tailwind can't supply is written as plain CSS in a `<style>` block in the page that needs it: `.project-card` / `.project-frame` in [index.html](index.html), `.gallery-item` and `[x-cloak]` in [photos.html](photos.html). Prefer extending those over inventing utility classes that won't exist.

## Page structure

Three top-level pages — [index.html](index.html), [about.html](about.html), [photos.html](photos.html) — each with a **hand-duplicated header/nav block**. Nav or logo changes must be made in all three. The active page marks its own nav link with `class="clickedLink"` instead of `class="Link"`; sub-pages link back to `index.html#projects` / `index.html#contact`, while index.html uses bare `#projects` / `#contact`.

Every page loads KaTeX auto-render from a CDN — it exists to typeset the `\[ \overrightarrow{s}W\]` logo in the header. Each page's background container starts with a `<p aria-hidden="true">_</p>` spacer; it stops the first child's top margin from collapsing out of the background div. Don't "tidy" it away without checking the layout.

`index.html` groups project cards into three `<section>`s (App / Data / School) inside a single `#projects` wrapper, all sharing the 400x480 `.project-card` box. The two App cards add `.project-frame` and embed *live sandboxed iframes* of other GitHub Pages apps.

[photos.html](photos.html) uses Alpine.js (pinned to `3.x.x` via jsDelivr) for the lightbox. The component is registered as `Alpine.data('imageGallery', ...)` in a `<script>` in `<head>` that must run before Alpine's deferred bundle. Only `<img>` tiles open in the lightbox — the `<video>` tile plays in place, and `step()` cycles over the images only.

## JavaScript

[src/js/Coaches/graphs.js](src/js/Coaches/graphs.js) is the only script file — a classic (non-module) script loaded at the bottom of index.html; D3 v7 comes from a CDN in `<head>`. The ~250 lines of sentiment data are a `const coaches` array literal **inlined at the top of the file**; that is the data source, deliberately (a `fetch` would need a server). `chart()` renders into `#graph svg`, and hovering or tapping a bar rewrites the card's `<h4>`. `setUpInfoPanel()` swaps the graph for a write-up and back.

All DOM selectors in this file are scoped to the coach-graphs card (`#graph rect`, `#coach-graphs h4`) — keep them that way, since index.html contains other `<h4>`s and other cards.
