import { readFileSync, writeFileSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * GitHub Pages serves a static file tree with no SPA rewrite, so a deep link
 * like /photos 404s unless we hand it the app. Pages falls back to 404.html,
 * so shipping a copy of index.html under that name makes client-side routes
 * resolve on a cold load.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      writeFileSync('dist/404.html', readFileSync('dist/index.html', 'utf8'));
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
});
