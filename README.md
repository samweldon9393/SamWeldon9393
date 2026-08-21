# My Personal Website

This website acts as my **portfolio** — a place to:

- Showcase what I'm currently working on (and past projects)
- Share a little bit about myself
- Post photos for friends and family

Live at [sam-weldon.com](https://sam-weldon.com).

## Built with

React 19 + TypeScript, bundled by Vite, styled with Tailwind CSS, deployed to
GitHub Pages by a GitHub Actions workflow on every push to `main`.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Other commands:

```bash
npm run build    # typecheck, then bundle to dist/
npm run preview  # serve the built site
npm run check    # typecheck + render every route (what CI runs)
```

## Adding to the site

Most updates are data edits, not markup:

| To add a...            | Edit                  |
| ---------------------- | --------------------- |
| project card           | `src/data/projects.ts` |
| photo or video tile    | `src/data/photos.ts`   |
| nav or contact link    | `src/data/site.ts`     |

A whole new page means a component in `src/pages/` and a `<Route>` in
`src/App.tsx`.

## Projects

**Apps**

- [Sing Sing Prison Museum Maps](https://samweldon9393.github.io/SingSingPrisonMuseum-maps/)
- [SafeWorks: Harm Reduction Service Locator](https://samweldon9393.github.io/SafeWorks/)

**Data**

- Featured: [Reddit Hates Coaches](https://github.com/samweldon9393/Reddit-Hates-Coaches) —
  built with **D3** to create an **interactive graph** that highlights the relationship
  between comment volume and sentiment. My favorite piece is the bar graph, which makes
  that relationship visually clear.
- Sing Sing Prison Museum animations

**School**

- MyMake — an implementation of `make` in C++
- Webserver — a web server written from scratch in C

## Sources

- **Background image**: [Night Sky Texture by Mischiefidea](https://www.deviantart.com/mischiefidea/art/Textures-002-Night-Sky-180375638)
- **Gallery design**: [TailwindFlex – Image Gallery](https://tailwindflex.com/@anonymous/image-gallery)

---

Thanks for visiting my portfolio!
