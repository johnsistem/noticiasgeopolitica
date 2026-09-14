// Datos geográficos y analíticos verificados de teatros de conflicto.
// Fuente base: Wikipedia (artículos citados) + reportes públicos. Geolocalización real.
// Las capas de rutas/alcances son REPRESENTACIONES estimadas, no datos en vivo.

export const theaters = [
  {
    id: 'bab-el-mandeb',
    name: 'ESTRECHO DE BAB EL-MANDEB & ISLA DE PERIM',
    short: 'Bab el-Mandeb',
    region: 'Mar Rojo',
    threat: 'Crítica',
    center: [12.6534, 43.4182],
    zoom: 9,
    summary: 'Chokepoint entre el Mar Rojo y el Golfo de Adén. La isla de Perim (Mayyun) divide el estrecho en dos canales navegables.',
    source: 'Reportes públicos / Al Jazeera / Reuters',
    stats: [
      { label: 'Ancho del estrecho', value: '26 km' },
      { label: 'Comercio mundial', value: '~12%' },
      { label: 'Petróleo marítimo', value: '~11%' }
    ],
    keyPoints: [
      { lat: 12.6534, lon: 43.4182, name: 'ISLA DE PERIM (MAYYUN)', desc: 'Batería de Misiles & Pista Táctica' },
      { lat: 12.7821, lon: 43.5109, name: 'PUESTO DE RADAR COSTERO', desc: 'Vigilancia marítima OTH' },
      { lat: 12.6102, lon: 43.3411, name: 'BAB ISKANDER (CANAL)', desc: 'Cuello de botella 2.9 Nmi' }
    ],
    bases: [
      { lat: 11.54, lon: 43.15, name: 'CAMP LEMONNIER (EE. UU.)' },
      { lat: 11.60, lon: 43.10, name: 'BASE DORALEH (CHINA)' },
      { lat: 13.01, lon: 42.73, name: 'PUERTO DE ASSAB (ERITREA)' }
    ],
    routes: [
      [[13.20, 43.05], [12.65, 43.42], [12.10, 43.75]],
      [[13.45, 42.95], [12.90, 43.30], [12.30, 43.95]]
    ],
    zones: [
      { lat: 12.6534, lon: 43.4182, radius: 300000, name: 'ALCANCE TEÓRICO ~300 km', color: '#ef4444' },
      { lat: 13.60, lon: 43.30, radius: 120000, name: 'ALCANCE TEÓRICO ~120 km', color: '#f59e0b' }
    ],
    analysis: [
      { title: '1. Posición Geográfica Clave', text: 'La isla de Perim (Mayyun) divide el estrecho en dos canales. Su control ofrece dominio visual y de tiro sobre el paso de una arteria que mueve en torno al 12% del comercio marítimo mundial.' },
      { title: '2. Militarización e infraestructura', text: 'El control de la isla y la costa yemení permite proyectar misiles antibuque y drones de corto alcance sobre los canales navegables, elevando el riesgo para petroleros clase VLCC.' },
      { title: '3. Seguros marítimos', text: 'La prima de riesgo bélico en la zona encarece el costo por travesía de los buques que aún cruzan el corredor del Mar Rojo.' },
      { title: '4. Ruta alternativa: Cabo de Buena Esperanza', text: 'El desvío rodeando Sudáfrica añade entre 10 y 14 días de navegación por trayecto, tensando las cadenas de suministro entre Asia y Europa.' }
    ]
  },
  {
    id: 'hormuz',
    name: 'ESTRECHO DE ORMUZ',
    short: 'Estrecho de Ormuz',
    region: 'Golfo Pérsico',
    threat: 'Crítica',
    center: [26.6, 56.5],
    zoom: 8,
    summary: 'Chokepoint entre el Golfo Pérsico y el Golfo de Omán. Por él pasa el 20% del gas natural licuado mundial y alrededor del 25% del comercio marítimo de petróleo.',
    source: 'Wikipedia: Strait of Hormuz / EIA',
    stats: [
      { label: 'Ancho mínimo', value: '39 km' },
      { label: 'Longitud', value: '167 km' },
      { label: 'Petróleo marítimo', value: '~25%' }
    ],
    keyPoints: [
      { lat: 27.18, lon: 56.28, name: 'BANDAR ABBAS (IRÁN)', desc: 'Puerto y base naval' },
      { lat: 26.95, lon: 56.28, name: 'ISLA QESHM', desc: 'Mayor isla del estrecho' },
      { lat: 26.19, lon: 56.25, name: 'KHASAB (OMÁN)', desc: 'Península de Musandam' },
      { lat: 27.07, lon: 56.46, name: 'ISLA ORMUZ', desc: 'Punto de control histórico' }
    ],
    bases: [
      { lat: 27.17, lon: 56.28, name: 'BASE NAVAL DE BANDAR ABBAS' },
      { lat: 26.95, lon: 55.77, name: 'BASE NAVAL DE HASHT NAKHEL (QESHM)' }
    ],
    routes: [
      [[26.7, 56.3], [26.55, 56.5], [26.45, 56.65]],
      [[26.55, 56.2], [26.4, 56.45], [26.3, 56.6]]
    ],
    zones: [
      { lat: 26.6, lon: 56.5, radius: 185000, name: 'ALCANCE AShM ESTIMADO', color: '#ef4444' }
    ],
    analysis: [
      { title: '1. El chokepoint energético', text: 'Entre 2023-2025, el 20% del gas natural licuado y el 25% del petróleo transportado por mar pasó por Ormuz. Es la única salida marítima del Golfo Pérsico y ruta crítica para la energía europea y asiática.' },
      { title: '2. Tráfico y esquema de separación', text: 'Un promedio de 14-21 millones de barriles al día transita por el estrecho. Los buques siguen un esquema de separación de tráfico (TSS) con carriles de 2 millas náuticas ancho, dentro de aguas territoriales de Omán.' },
      { title: '3. Dependencia de los países del Golfo', text: 'Emiratos, Catar, Baréin, Kuwait e Irak dependen de Ormuz como única ruta marítima. Una interrupción prolongada provocaría una seria crisis de suministro de petróleo para Japón, India, Corea del Sur y China.' },
      { title: '4. Disputas de paso', text: 'Irán extendió su mar territorial a 12 millas náuticas en 1959 y Omán en 1972, "cerrando" legalmente el punto más angosto. EE. UU. nunca reconoció las restricciones al paso en tránsito.' }
    ]
  },
  {
    id: 'malaca',
    name: 'ESTRECHO DE MALACA',
    short: 'Estrecho de Malaca',
    region: 'Indo-Pacífico',
    threat: 'Alta',
    center: [3.2, 100.5],
    zoom: 7,
    summary: 'El estrecho más transitado del mundo: conecta el Océano Índico y el Pacífico entre la península malaya y Sumatra, moviendo ~25% de los bienes comercializados.',
    source: 'Wikipedia: Strait of Malacca',
    stats: [
      { label: 'Longitud', value: '930 km' },
      { label: 'Ancho mínimo', value: '38 km' },
      { label: 'Buques/año', value: '94,000+' }
    ],
    keyPoints: [
      { lat: 1.29, lon: 103.85, name: 'SINGAPUR', desc: 'Puerto más activo del mundo' },
      { lat: 2.19, lon: 102.25, name: 'MALACA (MALASIA)', desc: 'Ciudad histórica del estrecho' },
      { lat: 3.59, lon: 98.67, name: 'MEDAN (SUMATRA)', desc: 'Costado indonesio' }
    ],
    bases: [
      { lat: 1.24, lon: 103.84, name: 'BASE NAVAL CHANGI (SINGAPUR)' },
      { lat: 3.05, lon: 101.45, name: 'LUMUT RMN (MALASIA)' }
    ],
    routes: [
      [[5.7, 95.4], [3.0, 100.0], [1.4, 103.3]],
      [[1.5, 102.0], [1.3, 103.5], [1.2, 104.0]]
    ],
    zones: [],
    analysis: [
      { title: '1. El estrecho más transitado', text: 'Más de 94,000 buques lo cruzan cada año, transportando cerca del 25% de los bienes comerciados del mundo, incluido el 35% del petróleo por mar y el 20% del gas (2024).' },
      { title: '2. El dilema de Malaca', text: 'El término "dilema de Malaca" fue acuñado por el presidente chino Hu Jintao en 2003: cerca del 80% del crudo importado por China pasa por este corredor, exponiendo su vulnerabilidad energética.' },
      { title: '3. Características náuticas', text: 'El estrecho se estrecha a solo 2.8 km en el Canal Phillip, cerca de Singapur, y tiene un calado mínimo de 25 m. Los buques más grandes que el "Malaccamax" deben desviarse.' },
      { title: '4. Seguridad y cooperación', text: 'La piratería fue un problema grave hasta 2005; hoy es casi nula gracias a patrullas conjuntas (MALSINDO) y el acuerdo ReCAAP entre los estados ribereños.' }
    ]
  },
  {
    id: 'suwalki',
    name: 'CORREDOR DE SUWALKI',
    short: 'Corredor de Suwalki',
    region: 'Europa Oriental',
    threat: 'Alta',
    center: [54.2, 23.4],
    zoom: 8,
    summary: 'Franja de 65 km en la frontera Polonia-Lituania, el único vínculo terrestre entre los países bálticos y el resto de la OTAN, flanqueado por Kaliningrado y Bielorrusia.',
    source: 'Wikipedia: Suwałki Gap',
    stats: [
      { label: 'Longitud de la franja', value: '65 km' },
      { label: 'Vía terrestre', value: 'Única OTAN-Bálticos' },
      { label: 'Límite', value: 'Kaliningrado/Bielorrusia' }
    ],
    keyPoints: [
      { lat: 54.10, lon: 22.93, name: 'SUWALKI (POLONIA)', desc: 'Núcleo civil del corredor' },
      { lat: 54.40, lon: 23.19, name: 'KALVARIJA (LITUANIA)', desc: 'Lado báltico del corredor' },
      { lat: 54.71, lon: 20.50, name: 'KALININGRADO (RUSIA)', desc: 'Exclave ruso (CSTO)' },
      { lat: 53.67, lon: 23.83, name: 'GRODNO (BIELORRUSIA)', desc: 'Aliado ruso' }
    ],
    bases: [
      { lat: 54.33, lon: 22.81, name: 'BASE DE SUWALKI (POLONIA)' }
    ],
    routes: [
      [[54.10, 22.93], [54.40, 23.19], [54.71, 24.20]]
    ],
    zones: [],
    analysis: [
      { title: '1. El talón de Aquiles de la OTAN', text: 'El Corredor (Gap) de Suwalki es una franja de 65 km entre Polonia y Lituania. Si fuera capturada, se cortaría el único vínculo terrestre entre los países bálticos y el resto de la alianza.' },
      { title: '2. Flanqueado por adversarios', text: 'Al norte limita con el exclave ruso de Kaliningrado y al este con Bielorrusia, ambos del bloque CSTO. Misiles de corto alcance emplazados en ambos lados podrían atacar cualquier refuerzo.' },
      { title: '3. Infraestructura crítica civil', text: 'Por el corredor pasan la ruta Via Baltica (E67), el ferrocarril Rail Baltica en construcción, el gasoducto Polonia-Lituania (2022) y la línea de alta tensión LitPol Link.' },
      { title: '4. Escalada desde 2022', text: 'Las restricciones al tránsito ruso hacia Kaliningrado en 2022 y los ejercicios Zapad aumentaron la tensión en la zona, considerada un posible punto de ruptura en un conflicto OTAN-Rusia.' }
    ]
  },
  {
    id: 'taiwan',
    name: 'ESTRECHO DE TAIWÁN',
    short: 'Estrecho de Taiwán',
    region: 'Indo-Pacífico',
    threat: 'Crítica',
    center: [24.5, 119.8],
    zoom: 7,
    summary: 'Cuerpo de agua de 180 km de ancho que separa la isla de Taiwán de la China continental y conecta el Mar de China Meridional con el Mar de China Oriental.',
    source: 'Wikipedia: Taiwan Strait',
    stats: [
      { label: 'Ancho mínimo', value: '126 km' },
      { label: 'Longitud', value: '370 km' },
      { label: 'Profundidad media', value: '60 m' }
    ],
    keyPoints: [
      { lat: 25.0330, lon: 121.5654, name: 'TAIPÉI (TAIWÁN)', desc: 'Capital y centro de mando' },
      { lat: 24.4500, lon: 118.3800, name: 'KINMEN', desc: 'Isla a 2 km de la costa continental' },
      { lat: 26.1600, lon: 119.9500, name: 'MATSU', desc: 'Islas controladas por Taiwán' },
      { lat: 23.5700, lon: 119.5800, name: 'PENGHU (PESCADORES)', desc: 'Archipiélago en el centro del estrecho' }
    ],
    bases: [
      { lat: 24.26, lon: 120.62, name: 'BASE AÉREA CCK (TAIWÁN)' },
      { lat: 26.02, lon: 119.63, name: 'BASE DE MATSU' }
    ],
    routes: [
      [[27.0, 122.0], [24.8, 119.9], [23.0, 118.0]],
      [[25.5, 122.5], [24.0, 120.5], [22.0, 119.0]]
    ],
    zones: [
      { lat: 24.8, lon: 119.9, radius: 200000, name: 'ZONA DE EXCLUSIÓN (EST.)', color: '#ef4444' }
    ],
    analysis: [
      { title: '1. El ancho del estrecho', text: 'El estrecho de Taiwán tiene 180 km de ancho medio y 126 km en su punto más angosto, con una profundidad media de solo 60 metros. Es un chokepoint clave para el tráfico de contenedores del noreste asiático.' },
      { title: '2. La línea mediana', text: 'La "línea mediana" fue trazada en 1955 por el general estadounidense Benjamin O. Davis Jr. Corre de 27°N 122°E a 23°N 118°E. China nunca la reconoció; en 2019 la PLAAF la cruzó por primera vez desde 1999.' },
      { title: '3. Aguas internacionales en disputa', text: 'Desde 2018 China niega que el concepto de "aguas internacionales" aplique al estrecho, una posición rechazada por EE. UU., Australia y Taiwán.' },
      { title: '4. Importancia económica', text: 'Es la puerta de entrada y salida de prácticamente todos los puertos importantes del noreste de Asia. Taiwán construye además parques eólicos marinos en sus aguas.' }
    ]
  },
  {
    id: 'zangezur',
    name: 'CORREDOR DE ZANGEZUR',
    short: 'Corredor de Zangezur',
    region: 'Cáucaso Sur',
    threat: 'Alta',
    center: [39.2, 46.0],
    zoom: 8,
    summary: 'Concepto de corredor terrestre que conectaría Azerbaiyán con su exclave de Najicheván a través de la provincia armenia de Syunik.',
    source: 'Wikipedia: Zangezur corridor',
    stats: [
      { label: 'Franja en Armenia', value: '~32 km' },
      { label: 'Corredor', value: '~43 km' },
      { label: 'Derechos EE. UU.', value: '49 años' }
    ],
    keyPoints: [
      { lat: 39.2100, lon: 46.4100, name: 'KAPAN (SYUNIK)', desc: 'Capital de la provincia armenia' },
      { lat: 38.9000, lon: 46.2400, name: 'MEGHRI', desc: 'Punto más meridional de Armenia' },
      { lat: 39.5100, lon: 46.3400, name: 'GORIS', desc: 'Nodo de la carretera norte-sur' },
      { lat: 39.2100, lon: 45.4100, name: 'NAJICHEVÁN (AZERBAIYÁN)', desc: 'Exclave azerí' }
    ],
    bases: [],
    routes: [
      [[39.5100, 46.3400], [39.2100, 46.4100], [38.9000, 46.2400], [39.2100, 45.4100]]
    ],
    zones: [],
    analysis: [
      { title: '1. El proyecto', text: 'El corredor de Zangezur es un concepto de conexión terrestre promovido por Azerbaiyán y Turquía para unir Azerbaiyán continental con su exclave de Najicheván a través del sur de Armenia (provincia de Syunik).' },
      { title: '2. Origen: alto el fuego de 2020', text: 'El artículo 9 del acuerdo de alto el fuego de noviembre de 2020 preveía desbloquear todas las conexiones de transporte de la región, con supervisión rusa de los enlaces.' },
      { title: '3. La disputa de 2021', text: 'Azerbaiyán reclamó que el acuerdo establecía un "corredor", algo que Armenia rechaza. Aliyev llegó a amenazar con establecerlo por la fuerza; Armenia insiste en abrir rutas múltiples bajo su soberanía.' },
      { title: '4. TRIPP (2025)', text: 'En agosto de 2025, EE. UU. medió la firma de la "Trump Route for International Peace and Prosperity" (TRIPP), que otorga derechos de desarrollo a EE. UU. por 49 años sobre el corredor de 43 km. Rusia e Irán lo condenaron.' }
    ]
  },
  {
    id: 'artico',
    name: 'PASO DEL NOROESTE (ÁRTICO)',
    short: 'Paso del Noroeste',
    region: 'Ártico',
    threat: 'Media-Alta',
    center: [74.0, -95.0],
    zoom: 4,
    summary: 'Ruta marítima entre el Atlántico y el Pacífico a través del Ártico, junto a la costa norte de Canadá, por el archipiélago ártico.',
    source: 'Wikipedia: Northwest Passage',
    stats: [
      { label: 'Primera apertura', value: '2007' },
      { label: 'Rutas principales', value: '3 sectores' },
      { label: 'Soberanía', value: 'En disputa' }
    ],
    keyPoints: [
      { lat: 74.0000, lon: -84.0000, name: 'LANCASTER SOUND', desc: 'Entrada oriental del Paso' },
      { lat: 72.5000, lon: -119.0000, name: 'PRINCE OF WALES STRAIT', desc: 'Salida occidental del Parry Channel' },
      { lat: 65.8000, lon: -169.0000, name: 'ESTRECHO DE BERING', desc: 'Salida al Pacífico' },
      { lat: 71.4000, lon: -156.0000, name: 'POINT BARROW', desc: 'Paso costero de Alaska' }
    ],
    bases: [
      { lat: 78.2300, lon: 15.6400, name: 'SVALBARD (NORUEGA)' },
      { lat: 78.6500, lon: 16.3000, name: 'LONGYEARBYEN' }
    ],
    routes: [
      [[65.8, -169.0], [71.4, -156.0], [72.5, -119.0], [74.0, -84.0], [72.0, -60.0]],
      [[66.0, -170.0], [70.0, -140.0], [73.0, -100.0], [75.0, -80.0], [74.0, -55.0]]
    ],
    zones: [],
    analysis: [
      { title: '1. Tres secciones', text: 'El Paso del Noroeste se divide en tres sectores: este (Bahía de Baffin), centro (archipiélago ártico canadiense, eje del Parry Channel) y oeste (siguiendo la costa hasta el estrecho de Bering).' },
      { title: '2. Deshielo y navegabilidad', text: 'El 21 de agosto de 2007 el Paso quedó abierto a buques sin rompehielos por primera vez desde que hay registros (1972). Volvió a abrirse en 2008. El deshielo se asocia al cambio climático.' },
      { title: '3. Historial comercial', text: 'El primer carguero comercial en cruzarlo fue el SS Manhattan (115,000 toneladas) en agosto de 1969. En 2013 el Nordic Orion (73,500 t) lo atravesó. COSCO expresó interés en rutas regulares.' },
      { title: '4. Disputa de soberanía', text: 'Canadá sostiene que las aguas del archipiélago son aguas internas canadienses; EE. UU. las considera un estrecho internacional de paso. Esto complica cualquier régimen futuro de navegación.' }
    ]
  },
  {
    id: 'nilo',
    name: 'GUERRA DEL AGUA EN EL NILO (GERD)',
    short: 'Presa GERD (Nilo)',
    region: 'Cuerno de África',
    threat: 'Alta',
    center: [11.2153, 35.0931],
    zoom: 7,
    summary: 'La Gran Presa del Renacimiento Etíope (GERD) sobre el Nilo Azul, la mayor central hidroeléctrica de África, en el centro de la disputa por el agua con Egipto y Sudán.',
    source: 'Wikipedia: Grand Ethiopian Renaissance Dam',
    stats: [
      { label: 'Altura', value: '145 m' },
      { label: 'Potencia instalada', value: '5,150 MW' },
      { label: 'Reserva', value: '74 km³' }
    ],
    keyPoints: [
      { lat: 11.2153, lon: 35.0931, name: 'PRESA GERD (ETIOPÍA)', desc: 'Gran Presa del Renacimiento' },
      { lat: 11.7900, lon: 34.4200, name: 'PRESA DE ROSEIRES (SUDÁN)', desc: 'Aguas abajo del GERD' },
      { lat: 22.5000, lon: 32.0000, name: 'LAGO NASSER (EGIPTO)', desc: 'Reserva estratégica egipcia' }
    ],
    bases: [],
    routes: [
      [[11.2153, 35.0931], [11.7900, 34.4200], [15.5000, 32.5000], [22.5000, 32.0000]]
    ],
    zones: [],
    analysis: [
      { title: '1. La mayor hidroeléctrica de África', text: 'La GERD es una presa de gravedad sobre el Nilo Azul en la región de Benishangul-Gumuz (Etiopía). Mide 145 m de alto y 1,780 m de largo, con una capacidad instalada de 5,150 MW.' },
      { title: '2. Reserva y llenado', text: 'El embalse (Lago Nigat) tiene una capacidad de 74 km³ y 1,874 km² de superficie. Su quinto y último llenado se completó en octubre de 2024. La presa fue inaugurada el 9 de septiembre de 2025.' },
      { title: '3. Dependencia egipcia', text: 'Egipto depende del Nilo para cerca del 90% de su agua. Considera la presa una amenaza a su abastecimiento y bloqueó durante años el financiamiento internacional del proyecto.' },
      { title: '4. Equilibrio regional', text: 'Etiopía sostiene que la presa regula el caudal y reduce la evaporación. La disputa por el ritmo de llenado y la operación sigue tensando las relaciones entre Egipto, Sudán y Etiopía.' }
    ]
  },
  {
    id: 'mar-negro',
    name: 'MAR NEGRO & CRIMEA',
    short: 'Mar Negro / Crimea',
    region: 'Mar Negro',
    threat: 'Crítica',
    center: [44.3, 34.0],
    zoom: 6,
    summary: 'Mar en guerra desde 2022: bloqueo ruso de granos, Flota del Mar Negro en Sebastopol y el estrecho de Kerch como cuellos de botella estratégicos sobre Ucrania.',
    source: 'Wikipedia: Crimea / Black Sea',
    stats: [
      { label: 'Superficie', value: '436,400 km²' },
      { label: 'Prof. máxima', value: '2,212 m' },
      { label: 'Paso Oeste-Este', value: '1,175 km' }
    ],
    keyPoints: [
      { lat: 44.60, lon: 33.53, name: 'SEVASTOPOL (CRIMEA)', desc: 'Base histórica de la Flota del Mar Negro rusa' },
      { lat: 45.35, lon: 36.47, name: 'ESTRECHO DE KERCH', desc: 'Puente de Crimea (2018), enlace Rusia-Crimea' },
      { lat: 46.48, lon: 30.73, name: 'ODESA (UCRANIA)', desc: 'Principal puerto granelero del corredor de grano' },
      { lat: 41.24, lon: 29.12, name: 'BÓSFORO (ESTRECHOS TURCOS)', desc: 'Única salida al Mediterráneo' }
    ],
    bases: [
      { lat: 44.62, lon: 33.54, name: 'BASE NAVAL DE SEBASTOPOL (RUSIA)' },
      { lat: 44.72, lon: 37.77, name: 'BASE NAVAL DE NOVOROSSIYSK' }
    ],
    routes: [
      [[46.48, 30.73], [44.00, 31.00], [42.50, 30.50], [41.24, 29.12]],
      [[45.35, 36.47], [44.50, 37.00], [44.72, 37.77]]
    ],
    zones: [
      { lat: 45.00, lon: 33.50, radius: 40000, name: 'ZONA DE BLOQUEO NAVAL NW (MINAS/DRONES)', color: '#e11d48' }
    ],
    analysis: [
      { title: '1. Anexión de Crimea (2014)', text: 'Crimea, reconocida como ucraniana por la AGNU, está ocupada por Rusia desde 2014 (~2.4 millones de habitantes, 27,000 km²). El tratado de 1997 permitió a Moscú mantener su flota en Sebastopol.' },
      { title: '2. Bloqueo del grano', text: 'Tras la invasión de 2022, Odesa quedó bajo interdicto naval ruso con zona de exclusión y amenaza de minas. El acuerdo de grano del Mar Negro (jul 2022–jul 2023) restauró parte de las exportaciones; los puertos danubianos (Izmail/Reni) fueron vía alternativa.' },
      { title: '3. Dominio naval desde Sebastopol', text: 'La Flota del Mar Negro impide el refuerzo marítimo de Ucrania. Novorossiysk actúa de base de respaldo tras los ataques de drones a Sebastopol.' },
      { title: '4. Kerch y la contención turca', text: 'El Puente de Crimea (2018) vertebra el enlace logístico Rusia-Crimea, pero es cuello de botella y objetivo militar. El Bósforo, bajo control turco (Convención de Montreux), limita el acceso de buques de guerra externos.' }
    ]
  },
  {
    id: 'spratly',
    name: 'MAR DE CHINA MERIDIONAL (SPRATLY)',
    short: 'Spratly / Mar del Sur de China',
    region: 'Indo-Pacífico',
    threat: 'Crítica',
    center: [12.0, 114.0],
    zoom: 6,
    summary: 'Disputa territorial con la "línea de los nueve guiones": bases artificiales chinas (Mischief, Fiery Cross), reclamos cruzados de Filipinas, Taiwán, Vietnam, Malasia y Brunei.',
    source: 'Wikipedia: South China Sea / Spratly Islands',
    stats: [
      { label: 'Área emergida', value: '~200 ha' },
      { label: 'Ocupaciones militares', value: '~45' },
      { label: 'Comercio marítimo', value: '~1/3 mundial' }
    ],
    keyPoints: [
      { lat: 10.38, lon: 114.35, name: 'ITU ABA / TAIPING', desc: 'Mayor isla natural (46 ha), ocupada por Taiwán' },
      { lat: 9.92, lon: 115.53, name: 'MISCHIEF REEF (MEIJI)', desc: 'Base artificial china desde 1995 en la ZEE de Filipinas' },
      { lat: 15.18, lon: 117.77, name: 'SCARBOROUGH SHOAL', desc: 'Atolón bajo control de facto chino desde 2012' },
      { lat: 9.55, lon: 112.97, name: 'FIERY CROSS REEF (YONGSHU)', desc: 'Cabecera militar china con pista de 3,000 m' }
    ],
    bases: [
      { lat: 9.92, lon: 115.53, name: 'BASE ARTIFICIAL DE MISCHIEF REEF (CHINA)' },
      { lat: 9.55, lon: 112.97, name: 'BASE DE FIERY CROSS REEF (PISTA + RADAR)' }
    ],
    routes: [
      [[1.26, 103.80], [6.00, 110.00], [10.00, 114.00], [17.00, 118.00]],
      [[8.00, 117.00], [9.80, 115.50], [11.00, 114.00]]
    ],
    zones: [
      { lat: 9.92, lon: 115.53, radius: 12000, name: 'ZONA DE SEGURIDAD 12 NM (RECLAMACIÓN CHINA)', color: '#f59e0b' }
    ],
    analysis: [
      { title: '1. La línea de los nueve guiones', text: 'Pekín reclama derechos históricos sobre casi todo el mar. El laudo del PCA (12-jul-2016, Filipinas v. China) declaró que la línea carece de efecto legal y que Scarborough y Taiping son "rocas"; China rechazó el laudo.' },
      { title: '2. Incidentes de 2012 y 2025', text: 'El enfrentamiento de Scarborough (2012) dejó el atolón bajo control de facto chino. En agosto de 2025, el destructor PLAN "Guilin" y la CCG 3104 colisionaron al perseguir al BRP "Suluan", con víctimas en la guardia costera.' },
      { title: '3. La "Gran Muralla de Arena"', text: 'China dragó desde ~2014 al menos 7 arrecifes (Mischief, Subi, Fiery Cross...) con pistas, radares y puertos de aguas profundas. El laudo de 2016 censuró el daño "severo" a los corales; el área emergida pasó a ~200 ha.' },
      { title: '4. Tránsito comercial clave', text: 'Por la zona pasa cerca de un tercio del comercio marítimo mundial. Las ocupaciones chinas se solapan con las de Taiwán (Itu Aba), Filipinas (Thitu, Second Thomas Shoal), Vietnam y Malasia.' }
    ]
  },
  {
    id: 'suez',
    name: 'CANAL DE SUEZ',
    short: 'Canal de Suez',
    region: 'Suez / Mar Rojo',
    threat: 'Alta',
    center: [30.3, 32.35],
    zoom: 8,
    summary: 'Corredor marítimo sin esclusas que conecta Mediterráneo y Mar Rojo, ahorrando ~8,900 km entre Asia y Europa. Ruta de ~12-13% del comercio marítimo mundial.',
    source: 'Wikipedia: Suez Canal',
    stats: [
      { label: 'Longitud', value: '193 km' },
      { label: 'Manga máxima', value: '77.5 m' },
      { label: 'Buques (2021)', value: '20,600+' }
    ],
    keyPoints: [
      { lat: 31.26, lon: 32.31, name: 'PUERTO SAID (EXTREMO NORTE)', desc: 'Acceso mediterráneo del canal' },
      { lat: 30.33, lon: 32.38, name: 'GRAN LAGO AMARGO', desc: 'Tramo de cruce central' },
      { lat: 29.97, lon: 32.56, name: 'SUEZ / PUERTO TEWFIK', desc: 'Extremo sur, conexión con el Mar Rojo' }
    ],
    bases: [
      { lat: 29.97, lon: 32.56, name: 'PUERTO TEWFIK / FONDEADERO SUR SCA' }
    ],
    routes: [
      [[31.26, 32.31], [30.33, 32.38], [29.97, 32.56], [25.00, 35.00]],
      [[29.97, 32.56], [20.00, 38.00], [0.00, 43.00], [-34.35, 18.47]]
    ],
    zones: [
      { lat: 30.30, lon: 32.35, radius: 30000, name: 'CORREDOR DE ESCOLTA / RADARIZADO (CONVOY)', color: '#3b82f6' }
    ],
    analysis: [
      { title: '1. Columna vertebral del comercio', text: 'Inaugurado el 17-nov-1869, ahorra ~8,900 km y ~8 días a 24 nudos entre el mar Arábigo y Londres. En 2021 transitaron más de 20,600 buques (~56/día), ~12-13% del comercio marítimo mundial.' },
      { title: '2. Crisis de Suez y nacionalización', text: 'Nasser nacionalizó la compañía en julio de 1956, provocando la Crisis de Suez. El canal quedó cerrado 8 años (1967-1975) por la Guerra de los Seis Días. La Convención de Constantinopla obliga a abrirlo a todas las banderas.' },
      { title: '3. Expansión de 2015', text: 'El bypass de Ballah (35 km, ~US$9,000 millones, 2014-2015) casi duplicó la capacidad teórica de 49 a 97 buques/día. La manga máxima (77.5 m) limita los portacontenedores clase New Panamax.' },
      { title: '4. Desvío por el Cabo', text: 'Ante los ataques en el Mar Rojo (zona de Bab el-Mandeb), muchos armadores usan la ruta del Cabo de Agulhas (+3,000-5,000 km y +10-14 días), elevando fletes. El canal sigue siendo la vía que une Mediterráneo y Mar Rojo.' }
    ]
  },
  {
    id: 'narco-caribe',
    name: 'NARCOTRÁFICO CARIBE-PACÍFICO',
    short: 'Narco Caribe-Pacífico',
    region: 'América Latina / Caribe',
    threat: 'Crítica',
    center: [12.5, -80.5],
    zoom: 4,
    summary: 'Corredores de cocaína del Pacífico Oriental y el Caribe, bajo interdicción de EE. UU. (SOUTHCOM, JIATF-South, DEA) y presencia histórica de la 4.ª Flota.',
    source: 'Wikipedia: Operation Martillo / DEA / Narco-submarine',
    stats: [
      { label: 'Incautado Martillo (2012-17)', value: '693 t' },
      { label: 'Oficinas DEA extranjero', value: '91 en 68 países' },
      { label: 'Cocaína vía México (DEA)', value: '93%' }
    ],
    keyPoints: [
      { lat: 18.50, lon: -67.88, name: 'PASAJE DE MONA', desc: '~130 km entre Hispaniola y Puerto Rico' },
      { lat: 21.49, lon: -85.40, name: 'CANAL DE YUCATÁN', desc: 'Puerta del corredor caribeño al Golfo de México' },
      { lat: 24.558, lon: -81.782, name: 'JIATF-SOUTH (KEY WEST)', desc: 'Centro de interdicción marítima antidroga' },
      { lat: 3.893, lon: -77.078, name: 'BUENAVENTURA (COLOMBIA)', desc: 'Puerto del Pacífico, salida de semisumergibles' }
    ],
    bases: [
      { lat: 25.822, lon: -80.386, name: 'SOUTHCOM HQ (MIAMI)' },
      { lat: 24.558, lon: -81.782, name: 'JIATF-SOUTH (KEY WEST)' },
      { lat: 14.375, lon: -87.616, name: 'JTF-BRAVO (SOTO CANO, HONDURAS)' }
    ],
    routes: [
      [[-2.27, -80.15], [1.80, -78.76], [3.89, -77.08], [7.60, -82.20], [13.16, -87.80], [16.86, -99.88], [19.05, -104.32], [23.24, -106.42]],
      [[11.23, -74.19], [12.46, -71.66], [17.97, -76.79], [19.85, -73.55], [18.50, -67.88], [22.55, -75.80], [25.72, -79.28]]
    ],
    zones: [
      { lat: 8.5, lon: -83.5, radius: 300000, name: 'CORREDOR DE INTERDICCIÓN PACÍFICO ORIENTAL', color: '#d0342c' }
    ],
    analysis: [
      { title: '1. Operación Martillo', text: 'Iniciada el 15-ene-2012 bajo SOUTHCOM y JIATF-South con 14 países. Resultados verificables: 693 t de cocaína incautadas (ene-2012 a feb-2017), con 581 buques/aeronaves y 1,863 detenidos. Las incautaciones cayeron a 6 t en 2019 y 2 t en 2020.' },
      { title: '2. La malla de la DEA', text: 'La DEA (creada en 1973) opera 91 oficinas en 68 países. Venezuela expulsó a la DEA en 2005 y Bolivia en 2008 citando injerencia. El pretexto antinarcóticos sostiene la presencia operativa estadounidense en la región.' },
      { title: '3. SOUTHCOM y enclaves', text: 'SOUTHCOM se trasladó de Panamá a Miami en 1997. Enclaves: JIATF-South (Key West), JTF-Bravo (Soto Cano, Honduras) y apoyo aéreo en Comalapa. La 4.ª Flota se reactivó en 2008. Financiamiento: Mérida US$1,600M y CARSI US$361M.' },
      { title: '4. Semisumergibles del Pacífico', text: 'Cerca de un tercio de las ~2 t/día que salen de Colombia viajan por el Pacífico en semisumergibles (12-24 m, 4-12 t de carga, hasta ~3,200 km de alcance). La Guardia Costera estima interceptar apenas ~11% de ellos.' }
    ]
  }
];

export default theaters;
