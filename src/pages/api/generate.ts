export const prerender = false

import type { APIRoute } from 'astro'
import { createClient } from '@google/genai'

const GEMINI_KEY = import.meta.env.GEMINI_API_KEY

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function scrapeArticle(url: string) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml',
    },
  })
  const html = await res.text()

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : 'Sin título'

  const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)
  const imageUrl = ogImageMatch ? ogImageMatch[1] : ''

  const paragraphs: string[] = []
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let match
  while ((match = pRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    if (text.length > 30) paragraphs.push(text)
  }

  return { title, imageUrl, bodyText: paragraphs.join('\n\n') }
}

function getSystemPrompt(type: string): string {
  const base = `Eres un Analista Senior de Inteligencia Geoespacial y Fuentes Abiertas (OSINT). Transforma el texto en contenido para un portal web geopolítico.

REGLAS:
1. Lenguaje directo, periodístico, sin tecnicismos innecesarios
2. Usar términos: chokepoint, A2/AD, GEOINT, SIGINT si aplica
3. Coordenadas reales en decimal
4. Español natural

VOCABULARIO:
- chokepoint → punto de estrangulamiento
- A2/AD → zona de exclusión
- VLCC → superpetrolero
- SITREP → situación actual`

  if (type === 'cable') {
    return `${base}

GENERA UN CABLE FLASH (noticia breve).
Frontmatter:
---
title: '🚨 [TÍTULO EN MAYÚSCULAS]'
description: '[Resumen 1 línea]'
format: 'cable'
flash: true
urgency: 'FLASH'
threat_level: '[Crítica|Alta|Media]'
region: '[Región]'
tags: ['tag1', 'tag2', 'tag3']
coordinates: { lat: 0.0, lon: 0.0 }
date: '${new Date().toISOString()}'
readingTime: '1 MIN READ'
verification: '[CONFIRMADO|REPORTADO|OSINT|ANÁLISIS]'
source_channel: '[FUENTE]'
image: '[URL imagen]'
---

### [TÍTULO]

[2-3 párrafos: qué pasó, quién, dónde, cuándo, por qué]`
  }

  if (type === 'perfil') {
    return `${base}

GENERA UN PERFIL DE PAÍS o ENTIDAD.
Frontmatter:
---
title: '[PAÍS/ENTIDAD]'
description: '[Resumen]'
format: 'perfil'
region: '[Región]'
tags: ['tag1', 'tag2']
date: '${new Date().toISOString().split('T')[0]}'
verification: 'ANÁLISIS'
author: 'Equipo de Análisis'
---

### [NOMBRE]

#### Datos Generales
- **Capital:** ...
- **Población:** ...
- **Gobierno:** ...

#### Fuerzas Armadas
- **Ejército:** ...
- **Armada:** ...
- **Fuerza Aérea:** ...

#### Alianzas
- ...

#### Intereses Estratégicos
- ...`
  }

  if (type === 'comparativo') {
    return `${base}

GENERA UN COMPARATIVO entre dos entidades.
Frontmatter:
---
title: '[ENTIDAD A] vs [ENTIDAD B]'
description: '[Resumen comparativo]'
format: 'comparativo'
tags: ['tag1', 'tag2']
date: '${new Date().toISOString().split('T')[0]}'
verification: 'ANÁLISIS'
author: 'Equipo de Análisis'
---

### [ENTIDAD A] vs [ENTIDAD B]

| Categoría | [Entidad A] | [Entidad B] |
|-----------|-------------|-------------|
| ... | ... | ... |

#### Análisis
[Análisis de las diferencias y implicaciones]`
  }

  if (type === 'timeline') {
    return `${base}

GENERA UNA LÍNEA DE TIEMPO.
Frontmatter:
---
title: '[TEMA]: Cronología'
description: '[Resumen]'
format: 'timeline'
tags: ['tag1', 'tag2']
date: '${new Date().toISOString().split('T')[0]}'
verification: 'ANÁLISIS'
author: 'Equipo de Análisis'
---

### CRONOLOGÍA: [TEMA]

#### [FECHA]
- [Evento]

#### [FECHA]
- [Evento]`
  }

  if (type === 'resumen') {
    return `${base}

GENERA UN RESUMEN SEMANAL para newsletter.
Frontmatter:
---
title: 'RESUMEN SEMANAL: [FECHAS]'
description: '[Resumen]'
format: 'resumen'
tags: ['tag1', 'tag2']
date: '${new Date().toISOString().split('T')[0]}'
verification: 'ANÁLISIS'
author: 'Equipo de Análisis'
---

### RESUMEN SEMANAL

#### Top 5 de la semana
1. [Noticia 1]
2. [Noticia 2]
...

#### Análisis de tendencias
[Análisis]

#### Lo que viene la semana que viene
[Preview]`
  }

  if (type === 'post') {
    return `${base}

GENERA UN POST PARA REDES SOCIALES (hilo).
Frontmatter:
---
title: '[TEMA]'
description: '[Resumen]'
format: 'post'
tags: ['tag1', 'tag2']
date: '${new Date().toISOString()}'
verification: 'ANÁLISIS'
---

### HILO DE REDES SOCIALES

🧵 1/ [Tweet 1]

2/ [Tweet 2]

3/ [Tweet 3]

4/ [Tweet 4]

5/ [Tweet 5 - conclusión + link]`
  }

  if (type === 'geoespacial') {
    return `${base}

GENERA UN ANÁLISIS GEOESPACIAL de una zona.
Frontmatter:
---
title: 'ANÁLISIS: [ZONA]'
description: '[Resumen]'
format: 'geoespacial'
region: '[Región]'
tags: ['tag1', 'tag2']
coordinates: { lat: 0.0, lon: 0.0 }
date: '${new Date().toISOString().split('T')[0]}'
verification: 'ANÁLISIS'
author: 'Equipo de Análisis'
---

### ANÁLISIS GEOESPACIAL: [ZONA]

#### Ubicación
[Descripción geográfica]

#### Importancia Estratégica
[Por qué importa]

#### Infraestructura Militar
[Qué hay ahí]

#### Escenarios
[Qué podría pasar]`
  }

  // Default: informe/dossier
  return `${base}

GENERA UN INFORME/DOSSIER ANALÍTICO.
Frontmatter:
---
title: '📄 [TÍTULO EN MAYÚSCULAS]'
description: '[Resumen SEO 1-2 líneas]'
format: 'dossier'
category: '[Análisis Geopolítico|Seguridad Energética|Conflicto Regional|Economía Global|Defensa y Tecnología]'
threat_level: '[Crítica|Alta|Media]'
region: '[Región]'
tags: ['tag1', 'tag2', 'tag3']
coordinates: { lat: 0.0, lon: 0.0 }
date: '${new Date().toISOString().split('T')[0]}'
readingTime: '[X] MIN READ'
verification: '[CONFIRMADO|REPORTADO|OSINT|ANÁLISIS]'
defcon: '[NIVEL 1|NIVEL 2|NIVEL 3]'
author: 'Equipo de Análisis'
image: '[URL imagen]'
---

### [SUBTÍTULO]

[Cuerpo: 3-4 bloques de párrafos analíticos]`
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url, type } = await request.json()

    if (!url || !type) {
      return new Response(JSON.stringify({ error: 'Falta url o type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let scrapedData = { title: '', imageUrl: '', bodyText: '' }
    if (url.startsWith('http')) {
      scrapedData = await scrapeArticle(url)
    }

    const ai = new createClient({ apiKey: GEMINI_KEY })
    const systemPrompt = getSystemPrompt(type)
    const userPrompt = scrapedData.bodyText
      ? `Título: ${scrapedData.title}\n\nTexto:\n${scrapedData.bodyText}`
      : `Genera contenido basado en esta URL: ${url}`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
      },
    })

    let markdown = response.text || ''

    markdown = markdown
      .replace(/^```markdown\s*/i, '')
      .replace(/^```md\s*/i, '')
      .replace(/^```\s*/, '')
      .replace(/\s*```$/, '')
      .trim()

    if (scrapedData.imageUrl && !markdown.includes('image:')) {
      markdown = markdown.replace(/^---\s*\n/, `---\nimage: '${scrapedData.imageUrl}'\n`)
    }

    const titleMatch = markdown.match(/title:\s*['"]?([^'"\n]+)['"]?/)
    const slug = titleMatch ? createSlug(titleMatch[1]) : `articulo-${Date.now()}`

    return new Response(JSON.stringify({ markdown, slug }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error('Generate error:', err)
    return new Response(JSON.stringify({ error: err.message || 'Error al generar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
