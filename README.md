# orlandocamc.github.io

Portfolio of Orlando Camacho: autonomous robots and mixed-reality teleoperation. Static site built with
[Astro](https://astro.build), published on GitHub Pages. English at `/`, Spanish at `/es/`.

## Run it

Requirements: Node 24 (see `.nvmrc`; Astro needs ≥ 22.23.4) and an internet connection the first time
(the Satoshi typeface is downloaded from Fontshare, see below).

```sh
npm install
npm run dev        # http://localhost:4321, downloads the fonts first if they are missing
npm run build      # static site in dist/ (prebuild downloads and verifies the fonts)
npm run preview    # serves dist/
npm run check      # astro check: types in .astro and .ts files
```

Optional analytics: set `PUBLIC_GOATCOUNTER` (a GoatCounter code such as `orlandocamc`, or a full
`https://…/count` endpoint) in `.env` or as a repository variable. Empty by default: no script is added.

## Structure

```
src/
  content/fichas/{en,es}/<slug>.md     one Ficha (project file) per language
  content/entradas/{en,es}/<slug>.md   Entradas breves (short entries) and research lines
  content.config.ts                    zod schema of both collections
  data/site.ts                         name and links (contact is LinkedIn and GitHub only; no email is published)
  data/evidence/*.json                 Authorship reports, trimmed to totals, percentages and dates
  i18n/ui.ts                           interface strings in both languages
  styles/tokens.css                    ALL design tokens: typefaces, colours, type scale, space, motion
  styles/global.css · home.css · ficha.css
  components/                          Nav, VideoSlot, Hero3D, Evidence, Credits, ResultFigure, Chapter, Figure…
  components/pages/                    Home, FichaPage, About, NotFound (shared by both languages)
  pages/ and pages/es/                 thin routes: /, /about/, /projects/[slug]/, 404
  scripts/site.ts                      nav tone, scroll-spy, reading progress, deferred video, reveals
  scripts/hero3d.ts                    three.js SLAM map of the hero (loaded on demand)
public/media/                          video loops (MP4 + WebM + WebP poster) and stills
public/fonts/satoshi/                  licence text; the WOFF2 files are downloaded at build time
scripts/fetch-fonts.mjs                downloads Satoshi from Fontshare and checks its SHA-256
scripts/og/og.html                     source of public/og.jpg
docs/DECISIONES.md                     technical decisions
```

## Content rules

- Only verified facts go on the site. Anything that cannot be verified is left out: optional fields are
  tolerant, so a missing field means its block or row is not rendered (no placeholder is ever shown).
- Spanish copy carries a review marker for Orlando (`# ES: revisar con Orlando` in the front matter,
  `<!-- ES: revisar con Orlando -->` in the body and in every `/es/` page).
- Every team member is credited by name with what they did. Orlando's own work is the "What I built" list.
- In content strings, `**40–60 ms**` renders as an emerald key figure in the mono face.

## Add a Ficha

1. Create `src/content/fichas/en/<slug>.md` and `src/content/fichas/es/<slug>.md` with the same slug.
   Copy the front matter of an existing Ficha; the schema in `src/content.config.ts` documents every field
   and `npm run check` / `npm run build` fail if a field is wrong.
2. `order` sets its number (01, 02…) and position on the home page. `featured: true` makes it the big
   image chapter on the home page (only one Ficha should have it).
3. `results` holds measured figures only (`value`, `unit`, `context`); leave it out when nothing was
   measured and the Results section disappears.
4. Media: put `<name>.mp4`, `<name>.webm` and `<name>-poster.webp` in `public/media/` and reference
   `<name>` in `media.chapters` (dark video chapters, placed with `after:`) or `media.figures`. Each
   needs a `label` that describes what the clip shows, a caption and a credit. Loops: 6–12 s, no audio,
   under 4 MB. Without chapters the Ficha simply has no video chapter.
5. Evidence: add an Authorship report as `src/data/evidence/<id>.json` (only `repo`, `visibility`,
   `generated`, totals, and per person `name`, `is_orlando`, `commits`, `commits_pct`, `lines_pct`,
   `first_commit`, `last_commit`; never emails) and list `- report: <id>` under `evidence`.
   Each report is also published in full at `/evidence/<id>/` (and `/es/evidence/<id>/`); the Ficha links there.
   Omit `evidence` when there is none and the section disappears.
6. The body of the Markdown file is the Overview: first paragraph is the lead, the rest is detail.

The page is generated at `/projects/<slug>/` and `/es/projects/<slug>/`, and added to the sitemap.

## Change tokens and typefaces

Everything visual comes from `src/styles/tokens.css`; components only read role variables
(`--bg`, `--ink`, `--ink-2`, `--line`, `--accent`, `--fill`…) that the tone classes set.

- **Colours:** edit the palettes (`--d-*` dark graphite, `--l-*` light dossier) or the emerald scale
  (`--em-400/500/700/800`). Check contrast ≥ 4.5:1 for any text colour.
- **Typeface:** edit the `@font-face` / `@import` block at the top of `tokens.css` and `--font-sans` /
  `--font-mono`. If the new face is not Satoshi, also remove `"Range Dash"` from `--font-sans` (it only
  fixes Satoshi's wide en dash), update the two `<link rel="preload">` in `src/layouts/Base.astro`, and
  drop `scripts/fetch-fonts.mjs` from `package.json` if it is no longer needed. Faces from npm
  (`@fontsource/...`) must be installed with an exact version (`npm install --save-exact`).

## Fonts and licences

- **Satoshi** (Indian Type Foundry, ITF Free Font License, text in `public/fonts/satoshi/LICENSE-FFL.txt`).
  The licence allows self-hosting it for this website but not distributing the font files through a
  public repository, and does not allow modifying them (no subsetting). So the WOFF2 files are not in git:
  `scripts/fetch-fonts.mjs` downloads the official files from Fontshare before each build and checks
  their pinned SHA-256. If Fontshare updates the files, the build stops; review and update the hashes.
- **DM Mono** (SIL Open Font License) from `@fontsource/dm-mono`, latin subset.

## Open Graph image

`public/og.jpg` (1200 × 630) is rendered from `scripts/og/og.html` with a headless browser, for example:

```sh
msedge --headless=new --hide-scrollbars --allow-file-access-from-files --window-size=1200,630 \
  --screenshot=og.png file:///<path>/scripts/og/og.html
```

then converted to JPEG (quality ≈ 84). Run `npm run fonts` first so the typeface is available.

## Publish

`.github/workflows/deploy.yml` builds with the official `withastro/action` and deploys with
`actions/deploy-pages` (both pinned by commit SHA). In the repository settings, set
Pages → Source → GitHub Actions. Optional: repository variable `PUBLIC_GOATCOUNTER`.

Before every push, run gitleaks on the repository.
