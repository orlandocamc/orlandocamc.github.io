// Interface strings in both languages. Content (Fichas, Entradas breves) lives in src/content/.
// ES: revisar con Orlando — the Spanish strings are a first translation.
import { getRelativeLocaleUrl } from 'astro:i18n';

export const LOCALES = ['en', 'es'] as const;
export type Lang = (typeof LOCALES)[number];

export const ui = {
  en: {
    'meta.title': 'Orlando Camacho — Autonomous robots and mixed-reality teleoperation',
    'meta.description':
      'Orlando Camacho builds autonomous robots and the mixed-reality link that lets people step in from anywhere. Mechatronics Engineering, IBERO, Mexico City.',
    'skip': 'Skip to content',
    'nav.label': 'Primary',
    'nav.work': 'Work',
    'nav.credentials': 'Credentials',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.lang': 'Language',
    'motion.pause': 'Pause',
    'motion.play': 'Play',
    'hero.kicker': 'Mechatronics Engineering · IBERO, Mexico City',
    'hero.lede': 'I build autonomous robots — and the mixed-reality link that lets people step in from anywhere.',
    'hero.cta': 'Plague-Bot VR project file',
    'hero.meta': 'Occupancy grid salon_v2',
    'hero.cells': '296 × 218 cells',
    'cred.h': 'Credentials',
    'cred.paper': 'Paper accepted, co-author',
    'cred.semillero': 'Co-founder & Innovation Area Lead',
    'work.h': 'Selected work',
    'work.count': 'Five project files',
    'work.more': 'More project files',
    'work.open': 'Open project file',
    'research.h': 'Research',
    'entries.h': 'Also built',
    'entries.sub': 'Software, for range',
    'entries.entry': 'Entry',
    'entries.type': 'Type',
    'entries.summary': 'Summary',
    'entries.year': 'Year',
    'entries.links': 'Links',
    'contact.h': 'Contact',
    'contact.avail': 'Open to robotics internships and research stays from August 2027',
    'contact.where': 'Mexico City · open to relocation',
    'contact.email': 'Email',
    'contact.emailShow': 'Show email',
    'foot.line': 'Orlando Camacho · Mechatronics Engineering, IBERO · expected graduation fall 2029',
    'ficha.back': 'Selected work',
    'ficha.fileOf': 'Project file {n} of {total}',
    'ficha.role': 'My role',
    'ficha.team': 'Team',
    'ficha.advisor': 'Advisor',
    'ficha.recognition': 'Recognition',
    'ficha.publication': 'Publication',
    'ficha.period': 'Period',
    'ficha.links': 'Links',
    'ficha.overview': 'Overview',
    'ficha.results': 'Results',
    'ficha.built': 'What I built',
    'ficha.credits': 'Team & credit',
    'ficha.evidence': 'Evidence',
    'ficha.stack': 'Stack',
    'ficha.all': 'All work',
    'ficha.next': 'Next file',
    'ficha.videoTbc': '[video — to confirm]',
    'ev.report': 'Authorship report',
    'ev.private': 'Private repository',
    'ev.public': 'Public repository',
    'ev.generated': 'report generated {date} from its git history',
    'ev.commits': 'Commits by Orlando Camacho',
    'ev.of': '{a} of {b}',
    'ev.lines': 'Share of changed lines',
    'ev.dates': 'First and last commit',
    'ev.others': 'Other authors',
    'ev.method':
      'Method: all branches, without duplicate commits; merge and bot commits excluded. Lines come from git numstat, without binaries, generated or lock files. Dates are author dates. A commit count does not measure contribution on its own: git records who committed, not who contributed ideas, hardware or review. This report is one layer of evidence and is regenerated from the history with a script.',
    'ev.full': '[full report — link to confirm]',
    'ev.paper': 'Paper',
    'ev.recognition': 'Recognition',
    'about.title': 'About',
    'about.description': 'Orlando Camacho: education, positioning and what he is looking for.',
    'nf.title': 'Page not found',
    'nf.body': 'This page does not exist, or it moved.',
    'nf.home': 'Back to the start',
  },
  es: {
    'meta.title': 'Orlando Camacho — Robots autónomos y teleoperación en realidad mixta',
    'meta.description':
      'Orlando Camacho construye robots autónomos y la conexión en realidad mixta con la que una persona toma el control desde cualquier lugar. Ingeniería Mecatrónica, IBERO, Ciudad de México.',
    'skip': 'Saltar al contenido',
    'nav.label': 'Principal',
    'nav.work': 'Proyectos',
    'nav.credentials': 'Credenciales',
    'nav.about': 'Acerca',
    'nav.contact': 'Contacto',
    'nav.lang': 'Idioma',
    'motion.pause': 'Pausa',
    'motion.play': 'Reproducir',
    'hero.kicker': 'Ingeniería Mecatrónica · IBERO, Ciudad de México',
    'hero.lede': 'Construyo robots autónomos — y la conexión en realidad mixta con la que una persona toma el control desde cualquier lugar.',
    'hero.cta': 'Ficha de Plague-Bot VR',
    'hero.meta': 'Mapa de ocupación salon_v2',
    'hero.cells': '296 × 218 celdas',
    'cred.h': 'Credenciales',
    'cred.paper': 'Artículo aceptado, coautor',
    'cred.semillero': 'Cofundador y Líder del Área de Innovación',
    'work.h': 'Proyectos seleccionados',
    'work.count': 'Cinco fichas',
    'work.more': 'Más fichas',
    'work.open': 'Abrir ficha',
    'research.h': 'Investigación',
    'entries.h': 'También construí',
    'entries.sub': 'Software, para mostrar rango',
    'entries.entry': 'Entrada',
    'entries.type': 'Tipo',
    'entries.summary': 'Resumen',
    'entries.year': 'Año',
    'entries.links': 'Enlaces',
    'contact.h': 'Contacto',
    'contact.avail': 'Disponible para prácticas y estancias de investigación en robótica desde agosto de 2027',
    'contact.where': 'Ciudad de México · dispuesto a mudarme',
    'contact.email': 'Correo',
    'contact.emailShow': 'Mostrar correo',
    'foot.line': 'Orlando Camacho · Ingeniería Mecatrónica, IBERO · graduación esperada en otoño de 2029',
    'ficha.back': 'Proyectos seleccionados',
    'ficha.fileOf': 'Ficha {n} de {total}',
    'ficha.role': 'Mi rol',
    'ficha.team': 'Equipo',
    'ficha.advisor': 'Asesor',
    'ficha.recognition': 'Reconocimientos',
    'ficha.publication': 'Publicación',
    'ficha.period': 'Periodo',
    'ficha.links': 'Enlaces',
    'ficha.overview': 'Resumen',
    'ficha.results': 'Resultados',
    'ficha.built': 'Lo que construí',
    'ficha.credits': 'Equipo y créditos',
    'ficha.evidence': 'Evidencia',
    'ficha.stack': 'Stack',
    'ficha.all': 'Todos los proyectos',
    'ficha.next': 'Siguiente ficha',
    'ficha.videoTbc': '[video — to confirm]',
    'ev.report': 'Reporte de autoría',
    'ev.private': 'Repositorio privado',
    'ev.public': 'Repositorio público',
    'ev.generated': 'reporte generado el {date} a partir de su historial de git',
    'ev.commits': 'Commits de Orlando Camacho',
    'ev.of': '{a} de {b}',
    'ev.lines': 'Proporción de líneas cambiadas',
    'ev.dates': 'Primer y último commit',
    'ev.others': 'Otros autores',
    'ev.method':
      'Método: todas las ramas, sin commits duplicados; se excluyen los commits de merge y de bots. Las líneas vienen de git numstat, sin binarios, archivos generados ni lockfiles. Las fechas son fechas de autor. El número de commits no mide por sí solo la contribución: git registra quién hizo el commit, no quién aportó ideas, hardware o revisión. Este reporte es una capa de evidencia y se regenera del historial con un script.',
    'ev.full': '[reporte completo — link to confirm]',
    'ev.paper': 'Artículo',
    'ev.recognition': 'Reconocimientos',
    'about.title': 'Acerca',
    'about.description': 'Orlando Camacho: formación, posicionamiento y qué busca.',
    'nf.title': 'Página no encontrada',
    'nf.body': 'Esta página no existe o cambió de lugar.',
    'nf.home': 'Volver al inicio',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function useT(lang: Lang) {
  return (key: UiKey, vars: Record<string, string | number> = {}) => {
    let s: string = ui[lang][key] ?? ui.en[key];
    for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
    return s;
  };
}

export function isLang(x: string | undefined): x is Lang {
  return x === 'en' || x === 'es';
}

/** Localised URL for a path written without locale, e.g. url('es', 'projects/plague-bot-vr') */
export function url(lang: Lang, path = ''): string {
  return getRelativeLocaleUrl(lang, path);
}

/** The same page in the other language: strips the /es/ prefix and rebuilds it. */
export function pathWithoutLocale(pathname: string): string {
  return pathname.replace(/^\/es(\/|$)/, '/').replace(/^\/+/, '');
}

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');
