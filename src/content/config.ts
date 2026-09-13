import { defineCollection, z } from 'astro:content';

const informesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string().default('INFORMES OSINT'),
    defcon: z.string().default('DEFCON 3'),
    hotspots: z.array(z.string()).default([]),
    image: z.string().default('/images/default-dossier.jpg'),
    author: z.string().default('Comando OSINT'),
    readingTime: z.string().default('8 MIN READ')
  }),
});

export const collections = {
  informes: informesCollection,
};
