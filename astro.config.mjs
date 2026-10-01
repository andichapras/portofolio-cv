// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.andichapras.com',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !/^\/(?:id\/)?404(?:\.html)?\/?$/.test(new URL(page).pathname),
      i18n: { defaultLocale: 'en', locales: { en: 'en', id: 'id' } },
    }),
  ],
});
