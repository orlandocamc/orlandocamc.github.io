// Authorship reports (Reporte de autoría), trimmed copies in src/data/evidence/.
// Only totals, percentages and dates are kept: no emails, no paths.
export interface Person {
  name: string;
  is_orlando: boolean;
  commits: number;
  commits_pct: number;
  lines_pct: number;
  first_commit: string;
  last_commit: string;
}
export interface Report {
  repo: string;
  visibility: 'public' | 'private';
  generated: string;
  total_commits: number;
  merge_commits_excluded: number;
  bot_commits_excluded: number;
  people: Person[];
}

const files = import.meta.glob<Report>('../data/evidence/*.json', { eager: true, import: 'default' });

export function getReport(id: string): Report {
  const r = files[`../data/evidence/${id}.json`];
  if (!r) throw new Error(`Authorship report not found: src/data/evidence/${id}.json`);
  return r;
}
