import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Public-facing URL of the deployed landing. Used by sitemap + canonical tags.
// Override locally with PUBLIC_SITE_URL in `.env` if needed.
const SITE = process.env.PUBLIC_SITE_URL || 'https://onswer.app';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  prefetch: { defaultStrategy: 'viewport' },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: {
      // Each locale lives at its own prefix (/en, /pt) — required so we can
      // serve a distinct OG image per language and let LLM crawlers/Google
      // index them independently.
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', pt: 'pt-BR' },
      },
    }),
  ],
});
