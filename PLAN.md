# Plan de Desarrollo — Noticias Geopolítica

## Qué es el sitio
Medio independiente de noticias y análisis geopolítico. **NO** es una terminal de inteligencia ni agencia secreta. El diseño usa estética táctica/militar, pero el lenguaje debe ser el de un medio de comunicación profesional.

**Stack:** Astro + Tailwind CSS + Leaflet (mapas) + Decap CMS + Supabase ✅
**Deploy:** Vercel → `https://noticiasgeopolitica.vercel.app`
**Servidor local:** `localhost:4321` — `npm run dev`
**Logo:** `public/logo2.jpg` (600x600 JPEG)

---

## Contenido Actual

### Cables (9)
1. Pentagono confiesa que se quedan sin armas
2. Irán expone submarino no tripulado Anduril capturado
3. Caravana de guerreros hutíes avanza por el desierto
4. Tensión en el Estrecho de Ormuz — ofensiva naval iraní
5. Hutíes toman el control del Estrecho de Bab el-Mandeb
6. Israel confiesa que Yemen es peor que Ormuz
7. Irán ataca a portaaviones y destructor de EE.UU.
8. EE.UU. confirma bombardeo a tres petroleros iraníes en altamar
9. Trump rechaza ataque saudí contra hutíes en Mar Rojo

### Informes (5)
1. Análisis de seguridad marítima en Bab el-Mandeb (MDX)
2. Situación actual: escalada crítica en Bab el-Mandeb
3. Trump revela que hutíes llamaron en secreto a la Casa Blanca
4. El fin de la era del dólar: deuda, oro y nueva moneda de reserva
5. Hutíes atacan base Sharurah, Arabia Saudita

### Teatros (12) — todos con datos reales
| Teatro | Región | Amenaza | Bases | Zones |
|--------|--------|---------|-------|-------|
| Bab el-Mandeb | Mar Rojo | Crítica | 3 | 2 |
| Ormuz | Golfo Pérsico | Crítica | 2 | 1 |
| Malaca | Indo-Pacífico | Alta | 2 | **vacío** |
| Suwalki | Europa Oriental | Alta | 1 | **vacío** |
| Taiwán | Indo-Pacífico | Crítica | 2 | 1 |
| Zangezur | Cáucaso Sur | Alta | **vacío** | **vacío** |
| Ártico | Ártico | Media-Alta | 2 | **vacío** |
| Nilo (GERD) | Cuerno de África | Alta | **vacío** | **vacío** |
| Mar Negro | Mar Negro | Crítica | 2 | 1 |
| Spratly | Indo-Pacífico | Crítica | 2 | 1 |
| Suez | Suez / Mar Rojo | Alta | 1 | 1 |
| Narco Caribe | América Latina | Crítica | 3 | 1 |

**5 teatros sin `zones:[]`** (Malaca, Suwalki, Zangezur, Ártico, Nilo)
**2 teatros sin `bases:[]`** (Zangezur, Nilo)

---

## Páginas del Sitio

| Ruta | Archivo | Estado |
|------|---------|--------|
| `/` | `index.astro` | ✅ Completa |
| `/mapas` | `mapas.astro` | ✅ Completa |
| `/informes` | `informes.astro` | ✅ Completa |
| `/informes/[slug]` | `informes/[slug].astro` | ✅ Completa |
| `/cables/[slug]` | `cables/[slug].astro` | ✅ Completa |

---

## Pendientes Reales

### 🔴 ALTA — Críticos

1. ~~**Newsletter sin backend**~~ ✅ RESUELTO — Formularios conectados a Supabase con `SUPABASE_PUBLISHABLE_KEY`. Tabla `subscribers` activa con RLS.

2. **Sitemap no configurado** — `@astrojs/sitemap` está en `package.json` pero NO está registrado en `astro.config.mjs` (solo `tailwind` y `mdx`). No se genera sitemap.

3. ~~**Dependencia muerta: `@supabase/supabase-js`**~~ ✅ RESUELTO — Ahora se usa para el newsletter.

4. **API key expuesta en `.env`** — `GEMINI_API_KEY` está presente. `.gitignore` la excluye correctamente. ✅ OK

### 🟡 MEDIA

5. **Decap CMS sin colección `cables`** — Solo está configurada la colección `informes` en `config.yml`. Los cables se crean manualmente.

7. ~~**Número hardcodeado "4 ZONAS MONITORIZADAS"**~~ ✅ RESUELTO — Ahora usa `{totalTeatros}` dinámico.

8. **Directorio `public/uploads/` no existe** — Decap CMS lo referencia para media pero no está creado.

### 🟢 BAJA

9. **5 teatros sin zones** — Malaca, Suwalki, Zangezur, Ártico, Nilo no tienen zonas de exclusión definidas.

10. **2 teatros sin bases** — Zangezur y Nilo no tienen bases militares listadas.

11. **Más contenido** — 9 cables y 5 informes es poco para un medio activo. Necesita generación continua de artículos.

12. **Generación de artículos con IA** — Hay un script `agente-osint.js` con dependencias (`@google/genai`, `axios`, `cheerio`). El usuario necesita una API key de Google Gemini configurada.

---

## Estado Actual (Sept 2026)

| Pendiente | Estado |
|-----------|--------|
| Newsletter con Supabase | ✅ Funcionando |
| `@supabase/supabase-js` integrado | ✅ Usado en index.astro e informes.astro |
| Sitemap configurado | ❌ Pendiente |
| Decap CMS colección cables | ❌ Pendiente |
| Directorio `public/uploads/` | ❌ Pendiente |
| Teatros sin zones/bases | ❌ Pendiente |

---

## Reglas de Contenido

### Lo que SÍ es:
- Noticias y análisis geopolítico basado en fuentes abiertas
- Investigaciones de largo formato
- Mapas interactivos de zonas de conflicto
- Boletín semanal por email

### Lo que NO es:
- Terminal de inteligencia ni agencia secreta
- Tiene satélites propios o acceso a inteligencia clasificada
- Usa terminología como WAR ROOM, DEFCON, SITREP, ZULU, GEOINT
- Muestra "CONFIANZA IA: 99.4%" ni "VERIFICADO POR SAT"
- Tiene personalidad fictional (Comandante Marc Segarra, etc.)

### Vocabulario permitido:
| Término militar | Término periodístico |
|---|---|
| WAR ROOM | CENTRO DE ANÁLISIS |
| DEFCON | NIVEL DE ALERTA |
| SITREP | SITUACIÓN ACTUAL |
| ZULU TIME | HORA LOCAL |
| GEOINT | IMÁGENES SATÉLITE |
| CHOKEPOINT | PUNTO DE ESTRANGULAMIENTO |
| A2/AD | ZONA DE EXCLUSIÓN |
| VLCC | PETROLERO DE GRAN TONELAJE |
| TEATRO | ZONA / REGIÓN |
| TÁCTICO | INTERACTIVO |
| RECON | BÚSQUEDA / MONITOREO |

---

## Archivos Clave

| Archivo | Función |
|---|---|
| `src/pages/index.astro` | Homepage |
| `src/pages/mapas.astro` | Visor de mapas |
| `src/pages/informes.astro` | Listado de informes |
| `src/pages/informes/[slug].astro` | Detalle de informe |
| `src/pages/cables/[slug].astro` | Detalle de cable |
| `src/layouts/TopNavLayout.astro` | Layout principal |
| `src/layouts/SidebarLayout.astro` | Layout para mapas |
| `src/data/theaters.js` | 12 zonas de conflicto |
| `src/data/content-guide.md` | Guía de contenido para IA |
| `src/content/config.ts` | Schema de colecciones |
| `src/content/cables/*.md` | 9 cables |
| `src/content/informes/*.md` | 5 informes |
| `public/logo2.jpg` | Logo del sitio |
| `public/caravana.jpeg` | Foto cable principal |
| `public/admin/config.yml` | Config Decap CMS |
| `agente-osint.js` | Script de scraping + IA |
| `.env` | API keys (verificar .gitignore) |

---

## Decisiones Tomadas

1. **Estética táctica SÍ, lenguaje militar NO**
2. **Todo contenido tiene `verification` badge** (CONFIRMADO, REPORTADO, OSINT, ANÁLISIS)
3. **Búsqueda por tags** en cables, informes y teatros
4. **Sección "OTRAS NOTICIAS RELACIONADAS"** en ambos templates de detalle
5. **Contenido real** — no contenido ficticio
6. **Glosario educativo** — A2/AD, OSINT, chokepoint explicados en lenguaje simple
7. **Guía de contenido** — `content-guide.md` con vocabulario + plantillas para IA
