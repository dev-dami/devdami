import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    readingTime: z.number().optional(),
    takeaways: z.string().optional(),
    ogImage: z.string().optional(),
    series: z.object({
      name: z.string(),
      order: z.number(),
    }).optional(),
  }),
});

export const collections = { blog };
