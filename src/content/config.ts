import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  threat_level: z.string().optional().default('Alta'),
  region: z.string().optional().default('Mar Rojo'),
  coordinates: z.object({
    lat: z.number(),
    lon: z.number()
  }).optional(),
  category: z.string().default('INFORMES OSINT'),
  defcon: z.string().default('DEFCON 3'),
  hotspots: z.array(z.string()).default([]),
  image: z.string().default('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop'),
  author: z.string().default('Comando OSINT'),
  readingTime: z.string().default('8 MIN READ')
});

const blogCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

const informesCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

export const collections = {
  blog: blogCollection,
  informes: informesCollection,
};

