import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localizedText = z.object({ en: z.string().min(1), id: z.string().min(1) });

// Cards, listings, and detail pages share the same validated editorial source.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    summary: localizedText,
    focus: localizedText,
    organization: z.string().min(1),
    role: z.string().min(1),
    draft: z.boolean().default(true),
    order: z.number().int().nonnegative().default(0),
    technologies: z.array(z.string().min(1)).min(1),
    sections: z.array(z.object({ heading: localizedText, text: localizedText })).min(1),
    stack: z.array(z.object({ label: localizedText, tools: z.string().min(1) })).min(1),
  }),
});

export const collections = { projects };
