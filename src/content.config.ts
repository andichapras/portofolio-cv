import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Validate project drafts at build time before they reach page templates.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    organization: z.string().min(1),
    role: z.string().min(1),
    draft: z.boolean().default(true),
    order: z.number().int().nonnegative().default(0),
    // Empty until the project-specific stack is confirmed.
    technologies: z.array(z.string().min(1)).default([]),
  }),
});

export const collections = { projects };
