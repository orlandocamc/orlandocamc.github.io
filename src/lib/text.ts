// Small text helpers shared by components.

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]);

/** Any "[… to confirm …]" marker in a content string. */
export const TBC = /\[[^\]]*to confirm[^\]]*\]/g;

/**
 * Escapes a content string, wraps every "[… to confirm]" marker in <span class="tbc"> (pending facts stay
 * visible and are never styled as content) and turns **figure** into an emerald key figure in mono.
 */
export function rich(s: string): string {
  return escapeHtml(s)
    .replace(TBC, (m) => `<span class="tbc">${m}</span>`)
    .replace(/\*\*([^*]+)\*\*/g, '<span class="data nw key">$1</span>');
}

/** Keeps hyphenated words such as "Plague-Bot" on one line in large titles. */
export function titleHtml(s: string): string {
  return escapeHtml(s).replace(/(\S+-\S+)/g, '<span class="nw">$1</span>');
}

/** "Plague-Bot VR" -> nice two-digit index */
export const pad2 = (n: number) => String(n).padStart(2, '0');
