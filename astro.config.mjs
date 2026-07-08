// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

const NOINDEX_PATHS = ['/about', '/faq', '/case-studies', '/how-it-works', '/who-we-work-with', '/privacy-policy', '/terms'];

// https://astro.build/config
export default defineConfig({
  site: 'https://dddd.jimaynewage1.workers.dev', // update once the custom domain / final pages.dev URL is confirmed
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((p) => page.endsWith(p) || page.endsWith(p + '/')),
    }),
  ],
});