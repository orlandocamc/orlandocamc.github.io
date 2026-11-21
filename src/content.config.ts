// Content collections. One Markdown file per Ficha and per Entrada breve, per language:
//   src/content/fichas/{en,es}/<slug>.md
//   src/content/entradas/{en,es}/<slug>.md
// Rule: only verified facts (Confirmed or No objection). Anything missing stays as a visible "[to confirm]".
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** "<lang>/<slug>.md" -> id "<lang>/<slug>" */
const idFromPath = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, '');

const video = z.object({
  /** base name in public/media/: <src>.mp4, <src>.webm and <src>-poster.webp */
  src: z.string(),
  width: z.number().int(),
  height: z.number().int(),
  /** describes what the clip shows (aria-label) */
  label: z.string(),
});

const image = z.object({
  /** file in public/media/ */
  src: z.string(),
  width: z.number().int(),
  height: z.number().int(),
  alt: z.string(),
});

/** A dark video chapter that interrupts the light dossier. */
const chapter = z.object({
  id: z.string(),
  /** which dossier section it follows */
  after: z.enum(['head', 'overview', 'results', 'built', 'credits']),
  layout: z.enum(['full', 'split', 'split-rev']),
  title: z.string(),
  body: z.string(),
  caption: z.string(),
  credit: z.string(),
  /** show the recording as a map: greyscale, inverted, emerald hue (navigation costmap) */
  costmap: z.boolean().default(false),
  /** alternate graphite step, for rhythm */
  alt: z.boolean().default(false),
  video,
});

/** A figure inside a dossier section: one video, or one or two images. */
const figure = z.object({
  section: z.enum(['built', 'credits']),
  caption: z.string(),
  credit: z.string(),
  wide: z.boolean().default(false),
  video: video.optional(),
  images: z.array(image).max(2).optional(),
});

const fichas = defineCollection({
  loader: glob({ pattern: '{en,es}/*.md', base: './src/content/fichas', generateId: idFromPath }),
  schema: z.object({
    title: z.string(),
    /** one sentence, used on the home page and in meta description */
    summary: z.string(),
    /** dossier lead, under the title */
    lead: z.string(),
    order: z.number().int(),
    /** organisation or context shown before the role on the home page */
    org: z.string().optional(),
    period: z.string(),
    role: z.string(),
    team: z.array(
      z.object({
        name: z.string(),
        /** what this person did (Aporte, when it is Orlando) */
        credit: z.string(),
        stack: z.string().optional(),
        orlando: z.boolean().default(false),
        advisor: z.boolean().default(false),
      }),
    ),
    teamNote: z.string().optional(),
    recognitions: z
      .array(z.object({ title: z.string(), event: z.string(), note: z.string().optional(), url: z.url().optional() }))
      .default([]),
    publication: z
      .object({
        title: z.string(),
        venue: z.string(),
        status: z.string(),
        number: z.string().optional(),
        /** in the paper's order */
        authors: z.array(z.string()),
        url: z.url().optional(),
        /** shown in the specification rail */
        short: z.string(),
      })
      .optional(),
    /** measured figures only. Empty when nothing was measured: the Results section is then left out. */
    results: z
      .array(
        z.object({
          value: z.string(),
          unit: z.string(),
          context: z.string(),
          /** short label: when present, the figure is also shown on the home page */
          short: z.string().optional(),
        }),
      )
      .default([]),
    /** "What I built": the Aporte, item by item */
    built: z.array(z.object({ title: z.string(), data: z.string().optional(), detail: z.string().optional() })),
    stack: z.array(z.object({ label: z.string(), value: z.string() })),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    media: z
      .object({
        /** still used on the home page; the page transition morphs it into the first chapter */
        cover: image.optional(),
        chapters: z.array(chapter).default([]),
        figures: z.array(figure).default([]),
      })
      .default({ chapters: [], figures: [] }),
    evidence: z
      .array(
        z.union([
          /** an Authorship report in src/data/evidence/<report>.json */
          z.object({ report: z.string(), note: z.string().optional() }),
          /** evidence that exists but is not ready to publish */
          z.object({ pending: z.string() }),
        ]),
      )
      .default([]),
    /** big image chapter on the home page (Plague-Bot) */
    featured: z.boolean().default(false),
  }),
});

const entradas = defineCollection({
  loader: glob({ pattern: '{en,es}/*.md', base: './src/content/entradas', generateId: idFromPath }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['software', 'research']),
    type: z.string(),
    summary: z.string(),
    year: z.string().optional(),
    stack: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    order: z.number().int(),
  }),
});

export const collections = { fichas, entradas };
