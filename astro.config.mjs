// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

const isNetlify = process.env.NETLIFY === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://indranalytics.netlify.app',
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: isNetlify ? netlify() : undefined,
  integrations: [sitemap()]
});
