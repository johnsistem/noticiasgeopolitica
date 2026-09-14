import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://noticiasgeopolitica.vercel.app';
  
  // Static routes
  const staticPages = [
    '',
    '/mapas',
    '/informes',
  ];

  // Dynamic MDX reports
  const informes = await getCollection('informes');
  const informePages = informes.map((informe) => `/informes/${informe.slug}`);

  // Dynamic cables (flash alerts)
  const cables = await getCollection('cables');
  const cablePages = cables.map((cable) => `/cables/${cable.slug}`);

  const allPages = [...staticPages, ...informePages, ...cablePages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemapindex.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
