// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Load custom Carv language grammar
const carvGrammar = JSON.parse(
    readFileSync(
        new URL('./src/lib/syntaxes/carv.tmLanguage.json', import.meta.url),
        'utf-8',
    ),
);

// https://astro.build/config
export default defineConfig({
    site: 'https://devdami.varityweb.com',
    output: 'server',
    adapter: vercel(),
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },

    integrations: [
        mdx(), 
        react(), 
        sitemap({
            customPages: [
                'https://devdami.varityweb.com/llm.txt',
                'https://devdami.varityweb.com/llm.md',
                'https://devdami.varityweb.com/llms.txt',
                'https://devdami.varityweb.com/llms.md',
            ]
        })
    ],

    markdown: {
        shikiConfig: {
            theme: 'vitesse-dark',
            wrap: true,
            includeLineNumbers: true,
            langs: [carvGrammar],
        },
    },
});
