import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * GitHub Pages serves a static file tree with no SPA rewrite, so a deep link
 * like /photos 404s unless we hand it the app. Pages falls back to 404.html,
 * so shipping a copy of index.html under that name makes client-side routes
 * resolve on a cold load.
 *
 * This runs in closeBundle rather than generateBundle because Vite writes
 * index.html after generateBundle, so it is not in the bundle to copy. It is a
 * no-op for SSR builds (npm run smoke), which emit no HTML at all.
 */
function spaFallback(): Plugin {
  let outDir = '';
  let isSsrBuild = false;

  return {
    name: 'spa-fallback-404',
    apply: 'build',

    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
      isSsrBuild = Boolean(config.build.ssr);
    },

    closeBundle() {
      if (isSsrBuild) return;

      const index = resolve(outDir, 'index.html');
      if (!existsSync(index)) {
        // Fail loudly: silently skipping would ship a site where every deep
        // link 404s, and nothing else would catch it.
        this.error(`spa-fallback-404: expected ${index} to exist`);
        return;
      }

      writeFileSync(resolve(outDir, '404.html'), readFileSync(index));
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
});
