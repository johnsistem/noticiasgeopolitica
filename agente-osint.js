import './polyfill.js';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * AGENTE-OSINT.JS
 * Script de transcripción y edición automatizada para sitio web de geopolítica en Astro.
 * Raspa el contenido de una noticia y utiliza la API de Gemini para transformarla en un informe SITREP / GEOINT.
 */

// Cargar variables de entorno desde .env si existe en la raíz del proyecto
const envPaths = [
  path.join(process.cwd(), '.env'),
  path.join(path.dirname(new URL(import.meta.url).pathname), '.env')
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      }
    });
    break;
  }
}

// 1. OBTENCIÓN Y VALIDACIÓN DE ARGUMENTOS & API KEY
const targetUrl = process.argv[2];

if (!targetUrl) {
  console.error('\n❌ [ERROR CRÍTICO]: Debes proporcionar la URL de una noticia como argumento.');
  console.log('   Uso: node agente-osint.js https://ejemplo.com/noticia-geopolitica\n');
  process.exit(1);
}

const apiKey = process.env.GEMINI_API_KEY || (process.env.PROCESS_ENV && process.env.PROCESS_ENV.GEMINI_API_KEY);

if (!apiKey) {
  console.error('\n❌ [ERROR DE CONFIGURACIÓN]: No se encontró la variable de entorno GEMINI_API_KEY.');
  console.log('   Asegúrate de exportarla en tu terminal o definirla en tu entorno:');
  console.log('   export GEMINI_API_KEY="tu-api-key-de-gemini"\n');
  process.exit(1);
}

/**
 * Función para interactuar con Gemini utilizando @google/genai o Fetch HTTP estándar con fallback de modelos
 */
async function generateGeminiContent(systemPrompt, userPrompt) {
  const modelsToTry = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-flash-latest'];

  // Intentar primero con la librería oficial @google/genai
  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });
    
    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: model,
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2,
          },
        });

        if (response && response.text) {
          console.log(`✔ [SISTEMA OSINT]: Procesado exitosamente con modelo ${model} (SDK).`);
          return response.text;
        }
      } catch (err) {
        // Probar siguiente modelo
      }
    }
  } catch (sdkError) {
    console.warn('⚠️ [AVISO]: Fallback a Fetch HTTP estándar para Gemini API.');
  }

  // Fallback a Fetch HTTP estándar
  let lastError = null;
  for (const model of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: userPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textOutput) {
          console.log(`✔ [SISTEMA OSINT]: Procesado exitosamente con modelo ${model} (HTTP Fetch).`);
          return textOutput;
        }
      } else {
        const errTxt = await response.text();
        lastError = `API Gemini (${model}) devolvió status ${response.status}: ${errTxt}`;
      }
    } catch (e) {
      lastError = e.message;
    }
  }

  throw new Error(`No se pudo conectar con los modelos de Gemini. Último error: ${lastError}`);
}

/**
 * Raspado de contenido web con Axios + Cheerio
 */
async function scrapeArticleContent(url) {
  console.log(`\n🔍 [SISTEMA OSINT]: Conectando a la fuente: ${url}...`);

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);
    const title = $('h1').first().text().trim() || $('title').text().trim();

    // Extraer meta imagen principal (og:image / twitter:image / primera imagen de artículo)
    let imageUrl = $('meta[property="og:image"]').attr('content') ||
                   $('meta[name="twitter:image"]').attr('content') ||
                   $('article img').first().attr('src') ||
                   $('main img').first().attr('src') ||
                   '';

    if (imageUrl && !imageUrl.startsWith('http')) {
      try {
        const parsedUrl = new URL(url);
        imageUrl = new URL(imageUrl, parsedUrl.origin).href;
      } catch (e) {
        imageUrl = '';
      }
    }

    // Si no hay imagen en la noticia, usar una imagen táctica militar de radar/satélite
    if (!imageUrl) {
      imageUrl = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
    }

    // Eliminar nav, script, ads, etc.
    $('script, style, iframe, nav, header, footer, aside, noscript, svg, form, .ads, .comments, .social-share, #comments, .sidebar').remove();

    let paragraphs = [];
    $('article p, main p, .article-body p, .post-content p, .entry-content p, p').each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 30) {
        paragraphs.push(text);
      }
    });

    let articleText = paragraphs.join('\n\n');
    if (!articleText || articleText.length < 150) {
      articleText = $('body').text().replace(/\s+/g, ' ').trim();
    }

    if (!articleText || articleText.length < 100) {
      throw new Error('No se pudo extraer suficiente texto relevante del artículo.');
    }

    console.log(`✔ [SISTEMA OSINT]: Contenido extraído correctamente (${articleText.length} caracteres).`);
    return { title, bodyText: articleText, imageUrl };

  } catch (error) {
    throw new Error(`Error en el raspado web de ${url}: ${error.message}`);
  }
}

/**
 * Generación de slug limpio a partir del título
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseCoordinates(markdownContent) {
  const match = markdownContent.match(/coordinates:\s*\{\s*lat:\s*([-\d.]+),\s*lon:\s*([-\d.]+)\s*\}/);
  if (match) {
    return { lat: match[1], lon: match[2] };
  }
  return { lat: '12.6534', lon: '43.4182' };
}

function parseTitle(markdownContent) {
  const match = markdownContent.match(/title:\s*['"]?([^'"\n]+)['"]?/);
  if (match && match[1]) {
    return match[1];
  }
  return 'informe-situacion-tactico-' + Date.now();
}

/**
 * Proceso Principal
 */
async function main() {
  try {
    const scrapedData = await scrapeArticleContent(targetUrl);

    console.log('🤖 [SISTEMA OSINT]: Generando Informe Táctico SITREP mediante IA Gemini 2.5 Flash...');

    const systemPrompt = `Eres un Analista Senior de Inteligencia Geoespacial (GEOINT) y Fuentes Abiertas (OSINT) asignado a una consola de operaciones estratégicas globales. Tu tarea es procesar el texto de la noticia adjunta y transformarla en un informe de situación (SITREP) inmersivo, serio y de alto impacto para un portal web geopolítico.

Debes devolver de forma obligatoria y exclusiva un string con formato de archivo Markdown (.md) estructurado con el siguiente Frontmatter exacto:
---
title: '[Título de alto impacto en mayúsculas, conciso y con emojis de alerta]'
description: '[Resumen ejecutivo de 1 o 2 líneas optimizado para SEO]'
threat_level: 'Crítica' | 'Alta' | 'Media'
region: 'Mar Rojo' | 'Indo-Pacífico' | 'Europa Oriental' | 'Latinoamérica' | 'Global'
coordinates: { lat: [Número Latitud], lon: [Número Longitud] }
date: '${new Date().toISOString().split('T')[0]}'
---
### [SUBTÍTULO DE ANÁLISIS EN MAYÚSCULAS]
[Cuerpo del reporte narrado con tono periodístico de urgencia, serio, grave y analítico. Divide la información en 3 o 4 bloques de párrafos concisos, ideales para lectura rápida. Si la noticia es terrestre, enfócate en fronteras y movimientos de tropas; si es naval, en rutas y comercio; si es tecnológica o económica, en cadenas de suministro e infraestructura crítica].

REGLAS DE VOCABULARIO Y CONTROL DE CALIDAD (FILTRO ANTI-ABURRIMIENTO):
1. EVITA tecnicismos jurídicos o académicos que entorpezcan la lectura rápida en redes sociales (ej. evita "interdicción", "paso inocente", o siglas de alianzas excesivamente oscuras como "Eje CRINK"). Reemplázalos por lenguaje directo y asimilable: "bloqueos", "ataques", "paso libre de fronteras/buques", o nombra directamente a los países involucrados (como "el apoyo de Irán y Rusia").
2. MANTÉN términos técnicos globales que aporten autoridad al informe y beneficien el SEO: "Chokepoint" (si aplica), "A2/AD" (zonas de exclusión militar), "GEOINT" (inteligencia satelital), "SIGINT" (inteligencia de radares/señales), o unidades de medida reales según el contexto (Nmi/millas náuticas, kilómetros, barriles de crudo, toneladas métricas, superpetroleros VLCC).
3. REGLA DE GEOLOCALIZACIÓN REQUISITO CRÍTICO: Identifica el epicentro geográfico de la noticia (ya sea una base militar, una isla, una ciudad fronteriza, un estrecho o la capital del país afectado). Busca en tu base de datos geográfica interna sus coordenadas geográficas reales aproximadas en sistema decimal (latitud y longitud) e inyéctalas numéricamente en el objeto 'coordinates' del Frontmatter. Nunca dejes las coordenadas en cero ni uses texto; deben ser números puros.`;

    const userPrompt = `NOTICIA A PROCESAR:\n\nTítulo Original: ${scrapedData.title}\n\nTexto Completo de la Noticia:\n${scrapedData.bodyText}`;

    let markdownOutput = await generateGeminiContent(systemPrompt, userPrompt);

    // Limpieza de bloques de código markdown sobrantes
    markdownOutput = markdownOutput
      .replace(/^```markdown\s*/i, '')
      .replace(/^```md\s*/i, '')
      .replace(/^```\s*/, '')
      .replace(/\s*```$/, '')
      .trim();

    // Si el frontmatter no contiene la propiedad image, inyectar la imagen raspada o táctica
    if (scrapedData.imageUrl && !markdownOutput.includes('image:')) {
      markdownOutput = markdownOutput.replace(/^---\s*\n/, `---\nimage: '${scrapedData.imageUrl}'\n`);
    }

    const extractedTitle = parseTitle(markdownOutput);
    const slug = createSlug(extractedTitle);
    const coords = parseCoordinates(markdownOutput);

    // Guardar en src/content/blog/ y en src/content/informes/ para máxima compatibilidad
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
    const informesDir = path.join(process.cwd(), 'src', 'content', 'informes');

    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }
    if (!fs.existsSync(informesDir)) {
      fs.mkdirSync(informesDir, { recursive: true });
    }

    const blogFilePath = path.join(blogDir, `${slug}.md`);
    const informesFilePath = path.join(informesDir, `${slug}.md`);

    fs.writeFileSync(blogFilePath, markdownOutput, 'utf-8');
    fs.writeFileSync(informesFilePath, markdownOutput, 'utf-8');

    console.log(`\n🎯 [SISTEMA OSINT]: Informe ${slug}.md generado con éxito en las coordenadas [${coords.lat}, ${coords.lon}].`);
    console.log(`📄 Guardado en: ${blogFilePath}`);

  } catch (error) {
    console.error(`\n❌ [ERROR DEL AGENTE OSINT]: ${error.message}\n`);
    process.exit(1);
  }
}

main();
