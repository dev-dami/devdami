// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://devdami.varityweb.com',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), react(), sitemap()],

  image: {
    service: {
      entrypoint: '@astrojs/image/sharp',
    },
    domains: ['avatars.githubusercontent.com', 'ghchart.rshah.org'],
    directories: ['/public'],
    cacheDir: 'public/_images',
  },

  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});