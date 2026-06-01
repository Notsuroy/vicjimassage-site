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
    // SEO: emit FAQPage schema + render visible FAQ section at end of post
    showFAQ: z.boolean().default(false),
    // SEO: comma-separated keyword list for Article schema
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
