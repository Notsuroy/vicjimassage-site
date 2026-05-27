import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Vicji'),
    readingTime: z.string().optional(),
    draft: z.boolean().default(false),
    lang: z.enum(['pt', 'en']),
  }),
});

export const collections = { blog };
