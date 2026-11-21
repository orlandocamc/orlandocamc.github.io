import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Ficha = CollectionEntry<'fichas'>;
export type Entrada = CollectionEntry<'entradas'>;

/** "es/plague-bot-vr" -> "plague-bot-vr" */
export const slugOf = (e: { id: string }) => e.id.split('/').slice(1).join('/');

export async function getFichas(lang: Lang): Promise<Ficha[]> {
  const all = await getCollection('fichas', (e) => e.id.startsWith(`${lang}/`));
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getEntradas(lang: Lang): Promise<Entrada[]> {
  const all = await getCollection('entradas', (e) => e.id.startsWith(`${lang}/`));
  return all.sort((a, b) => a.data.order - b.data.order);
}
