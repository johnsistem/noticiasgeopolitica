import { defineCollection, z } from 'astro:content';

// 1. Esquema Base para Contenidos OSINT
const baseOsintSchema = z.object({
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
  defcon: z.string().default('NIVEL DE ALERTA'),
  hotspots: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  image: z.string().default(''),
  author: z.string().default('Comando OSINT'),
  readingTime: z.string().default('8 MIN READ'),
  verification: z.enum(['CONFIRMADO', 'REPORTADO', 'OSINT', 'NO VERIFICADO', 'ANÁLISIS']).default('REPORTADO'),
  facebook_url: z.string().optional(),
  youtube_id: z.string().optional(),
});

// 2. Esquema Específico para Informes Deep-Dive (Formato Largo, In-Stream Videos > 3 min)
const informesSchema = baseOsintSchema.extend({
  format: z.literal('dossier').default('dossier'),
  video_url: z.string().optional(),
  youtube_id: z.string().optional(),
  chapters: z.array(z.object({
    timestamp: z.string(),
    title: z.string()
  })).default([]),
  pdf_download: z.string().optional(),
});

// 3. Esquema Específico para Cables Relámpago (Formato Rápido, Shorts / Alertas < 1 min)
const cablesSchema = baseOsintSchema.extend({
  format: z.literal('cable').default('cable'),
  flash: z.boolean().default(true),
  urgency: z.enum(['FLASH', 'IMMEDIATE', 'PRIORITY']).default('FLASH'),
  source_channel: z.string().default('CANAL DE ALERTA RÁPIDA OSINT'),
  audio_dispatch: z.string().optional(),
});

export const collections = {
  informes: defineCollection({ type: 'content', schema: informesSchema }),
  cables: defineCollection({ type: 'content', schema: cablesSchema }),
  blog: defineCollection({ type: 'content', schema: informesSchema }),
};


