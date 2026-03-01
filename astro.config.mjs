// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://devdami.dev',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), react(), sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});