// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site for GitHub Pages. English at the root, Spanish under /es/.
export default defineConfig({
  site: 'https://orlandocamc.github.io',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  prefetch: false,
  vite: {
    // three.js lives in its own chunk (~540 kB raw, ~133 kB gzip) that only loads once the hero is
    // visible and the browser is idle, never on the critical path. The limit is raised for that chunk only.
    build: { chunkSizeWarningLimit: 600 },
  },
});
