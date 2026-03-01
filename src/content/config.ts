import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: 'mdx',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    readingTime: z.number().optional(),
  }),
});

export const collections = { blog };
