// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    site: 'https://devdami.varityweb.com',
    output: 'server',
    adapter: vercel(),
    vite: {
        plugins: [tailwindcss()]
    },

    integrations: [mdx(), react(), sitemap()],

    markdown: {
        shikiConfig: {
            theme: 'vitesse-dark',
            wrap: true,
            includeLineNumbers: true
        }
    }
});
