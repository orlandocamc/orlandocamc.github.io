# Decisiones técnicas

Sitio portafolio de Orlando Camacho. Base visual: el prototipo v3 aprobado (`prototipos/v3/`, decisión 18
del plan): Satoshi + DM Mono, fondos grafito con tinte verde y esmeralda con función.

## Versiones (exactas en `package.json` y `package-lock.json`)

| Paquete | Versión | Uso |
|---|---|---|
| astro | 7.4.13 | sitio estático |
| three | 0.187.0 | mapa SLAM 3D del hero |
| @astrojs/sitemap | 3.7.6 | `sitemap-index.xml` con alternativas de idioma |
| @fontsource/dm-mono | 5.3.0 | monoespaciada para datos |
| @astrojs/check · typescript · @types/three | 0.9.12 · 6.0.3 · 0.187.0 | `astro check` (TypeScript 7 aún no es compatible con @astrojs/check) |

TypeScript estricto (`astro/tsconfigs/strict`). Sin MDX: las Fichas son Markdown con front matter
validado por zod; no hizo falta poner componentes dentro del contenido.

## Rutas e idiomas

- i18n nativo de Astro: `defaultLocale: 'en'`, `locales: ['en', 'es']`, `prefixDefaultLocale: false`.
  Inglés sin prefijo y español en `/es/`.
- `trailingSlash: 'always'` y formato de carpetas: las URL son `/projects/<slug>/`, como las sirve Pages.
- Cada página existe en los dos idiomas con el mismo slug. El selector EN/ES del nav enlaza a la página
  equivalente (`getRelativeLocaleUrl(locale, path)`), y cada página declara `hreflang` y `x-default`.
- Las páginas de `src/pages/` y `src/pages/es/` son rutas delgadas que pasan `lang` a un componente común
  de `src/components/pages/`: una sola plantilla por página.
- GitHub Pages solo usa `/404.html`. La 404 en inglés enlaza al inicio en español; `/es/404/` existe para
  enlaces directos.

## Contenido

- Colecciones `fichas` y `entradas` (Content Layer, `glob` por idioma, id `<lang>/<slug>`), con el schema
  en `src/content.config.ts`. Términos de `CONTEXT.md`: Ficha, Entrada breve, Aporte («What I built»),
  Evidencia, Reconocimiento, Reporte de autoría.
- Fuente única: `docs/hechos.md` del espacio de trabajo del perfil. Solo «Confirmado» o «Sin objeción».
  Lo que no se puede verificar no se muestra: los campos opcionales son tolerantes y, si faltan, el bloque
  o la fila no se renderiza (sin marcadores ni etiquetas vacías).
- La sección Results solo aparece si hay cifras medidas (ROSMASTER y los clientes de RM no tienen).
- La línea de investigación multirrobot es una entrada `kind: research`, sin nombres ni detalles.
- Evidencia de Semillero: el repo `semillero-web` es de la organización, así que su reporte muestra solo los
  totales y porcentajes de Orlando, sin nombres de carpetas internas ni de otras personas.
- Reportes de autoría: copia recortada en `src/data/evidence/` (totales, porcentajes, fechas, carpetas y
  nombres; sin correos). Cada reporte se publica completo en `/evidence/<id>/` y `/es/evidence/<id>/`. Los JSON
  se regeneraron a partir de `evidencia/` con una lista blanca de campos; los conteos de trailers o menciones
  a herramientas nunca se copian. Los de `rosmaster-lidar-vr` y `rosmaster-camara3d-vr` llevan una nota: sus fechas
  son las de creación del repo, no las del trabajo.

## Diseño

- **Todos los tokens en `src/styles/tokens.css`**, incluidas las caras tipográficas. Los componentes leen
  roles (`--bg`, `--ink`, `--accent`, `--fill`…) que asignan `.tone-dark`, `.tone-video` y `.tone-light`.
  Los velos y líneas sobre video usan `--veil-rgb` y `--d-ink-rgb`, no valores sueltos.
- Esmeralda con función, como en el v3: números de sección, cifras, subrayado y hover de enlaces, ítem
  activo del nav (scroll-spy en el inicio), anillo de foco, línea de progreso de 2 px en la Ficha, relleno
  de botones al hover, marcadores cuadrados de credenciales, barrido LiDAR y paredes del mapa (22 %), y el
  costmap del capítulo de navegación (gris, invertido, tono esmeralda al 40 %). `--em-400` sobre video,
  `--em-500` sobre grafito, `--em-700/800` en el dossier.
- Vidrio solo en el nav sobre video (`data-over="video"`), con respaldo sólido sin `backdrop-filter`.
- Sin sombras, brillos ni degradados decorativos; los únicos degradados son los velos de la imagen.

## Tipografía

- **Satoshi 400/500** autoalojada. La licencia ITF FFL permite autoalojarla en el sitio propio, pero
  prohíbe modificar los archivos (incluido el subconjunto) y distribuirlos por un repositorio público.
  Por eso los WOFF2 no están en git: `scripts/fetch-fonts.mjs` corre en `prebuild`, toma las URL de los
  WOFF2 del CSS oficial de `api.fontshare.com`, los descarga sin modificarlos y verifica su SHA-256
  fijado. La licencia (`LICENSE-FFL.txt`, de la descarga oficial) sí está en el repo.
- **DM Mono** (OFL) desde `@fontsource/dm-mono`, subconjunto latino. Barlow ya no se usa.
- Cara «Range Dash»: toma solo U+2013 de la grotesca del sistema, porque el guion corto de Satoshi mide
  casi 1 em y «40–60» parecía llevar raya. Se quita de `--font-sans` si cambia la tipografía.
- Las dos caras de Satoshi se precargan (`<link rel="preload">`): aparecen en la primera vista.

## Transiciones de página: View Transitions nativas entre documentos

Elegí `@view-transition { navigation: auto; }` (cross-document) en lugar de `<ClientRouter />`:

- El sitio sigue siendo multipágina de verdad: cada navegación carga HTML completo, sin router en JS, y
  los scripts (video diferido, 3D, scroll-spy) se ejecutan normalmente en cada página. Con ClientRouter
  habría que reinicializarlos en `astro:page-load` y limpiar three.js y los observers en cada salida.
- Es mejora progresiva: Chromium 126+ y Safari 18.2+ animan; Firefox navega sin animación.
- Replica el v2/v3: la imagen de Plague-Bot del inicio se convierte en el primer capítulo de video de la
  Ficha (`feature-media`) y el título en el H1 (`feature-title`), 560 ms ease-out. Solo el enlace usado
  recibe los nombres (`pageswap`/`pagereveal`, script en línea al final de `<body>` para que `pagereveal`
  llegue antes del primer render). «All work» invierte la transición. Desde el botón del hero, fundido.
- Con `prefers-reduced-motion: reduce` la regla `@view-transition` no aplica: no hay transiciones.
- Speculation Rules con **prefetch** (no prerender) al pasar el cursor: en Chromium, activar una página
  prerenderizada con una transición entre documentos registraba «Transition was aborted… Page already
  revealed». Con prefetch la transición corre sin errores.

## Componentes

- `VideoSlot`: póster primero; `site.ts` agrega `<source>` MP4 + WebM solo después de `load`, cerca del
  viewport, y nunca con `prefers-reduced-motion` ni `Save-Data`. Pausa fuera de pantalla y en pestañas
  ocultas. `MotionToggle` (WCAG 2.2.2) pausa el video de su bloque y el 3D del hero.
- `Hero3D`: isla sin framework. Astro no tiene directivas `client:*` para componentes `.astro`, así que el
  custom element `<hero-3d>` reproduce `client:visible`: espera a que el hero sea visible y a que el
  navegador esté ocioso, y entonces importa three.js y `hero3d.ts` como chunk aparte. No carga sin WebGL
  ni con movimiento reducido: se ve el plano fijo del mismo mapa.
- `Evidence`, `Credits`, `ResultFigure`, `Chapter`, `Figure`, `Nav` (vidrio solo sobre video).
- Contacto: solo LinkedIn y GitHub. Orlando decidió no publicar correo; no hay componente de correo.

## SEO

Título y descripción por página, `canonical`, `hreflang`, Open Graph y Twitter con `public/og.jpg`
(1200 × 630, generado del hero desde `scripts/og/og.html`), `sitemap-index.xml` (sin la 404),
`robots.txt`, y datos estructurados `Person` en el inicio (nombre, `alumniOf` IBERO, `sameAs` LinkedIn y
GitHub), `ProfilePage` en About y `CreativeWork` en cada Ficha. El nombre completo solo aparece una vez,
en About; no va en los metadatos.

## Rendimiento

Primera vista del inicio (gzip, medido sobre `dist/`): HTML 5.8 KB + CSS 5.3 KB + JS 1.5 KB + póster
14.2 KB + Satoshi 400 y 500 (25.5 KB cada una) + DM Mono 14.8 KB ≈ **93 KB**. Diferido: three.js +
`hero3d.ts` ≈ 133 KB gzip, mapa 2.4 KB, video del hero 373 KB (MP4), imagen de Plague-Bot 159 KB (lazy).
A 1.6 Mbps y 150 ms de RTT (4G lento) la primera vista queda por debajo de 2.5 s.

El chunk de three.js (≈ 540 KB sin comprimir) supera el aviso de 500 KB de Vite; se subió el límite a
600 KB solo por eso, porque nunca está en la ruta crítica.

## Publicación

`.github/workflows/deploy.yml`: `actions/checkout` v7.0.1, `withastro/action` v6.1.4 y
`actions/deploy-pages` v5.0.1, fijadas por SHA. Node 24. GoatCounter opcional con la variable
`PUBLIC_GOATCOUNTER` (vacía por defecto: no se inserta ningún script).
