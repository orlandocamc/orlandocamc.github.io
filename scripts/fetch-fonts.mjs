// Downloads Satoshi 400 and 500 (WOFF2) from Fontshare, its official distributor, into public/fonts/satoshi/.
//
// Why a script and not committed files: the ITF Free Font License allows self-hosting the font for
// your own website, but not making the font files available through a public repository. The site
// serves them (self-hosting); the repository only keeps this script and the licence text.
//
// The files are not modified (no subsetting, no conversion, no renaming of the font itself), as the
// licence requires. Each file is checked against a pinned SHA-256: if Fontshare changes a file, the
// build stops and the new hash has to be reviewed and pinned here.
//
// Runs automatically before `npm run build` (prebuild) and can be run by hand: `npm run fonts`.

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'fonts', 'satoshi');
const CSS_URL = 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500&display=swap';

/** weight -> pinned SHA-256 of the official WOFF2 */
const PINNED = {
  400: '50dca57f0b77918e0fb7dac998c3f5ef6b0c2a29657da97658a04f98ac532fc5',
  500: 'af02a72246f53ad49c44a591921edbd39ec8258a03d8cc2e0532aa1e497e85b4',
};

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const target = (w) => join(outDir, `satoshi-${w}.woff2`);

async function alreadyThere() {
  for (const w of Object.keys(PINNED)) {
    if (!existsSync(target(w))) return false;
    if (sha256(await readFile(target(w))) !== PINNED[w]) return false;
  }
  return true;
}

async function main() {
  if (await alreadyThere()) {
    console.log('fonts: Satoshi 400/500 present and verified');
    return;
  }
  await mkdir(outDir, { recursive: true });
  const css = await (await fetch(CSS_URL)).text();
  const faces = css.split('@font-face').slice(1);
  for (const w of Object.keys(PINNED)) {
    const face = faces.find((f) => new RegExp(`font-weight:\\s*${w}\\b`).test(f));
    const m = face && face.match(/url\('?(\/\/cdn\.fontshare\.com\/[^')]+\.woff2)'?\)/);
    if (!m) throw new Error(`fonts: no WOFF2 for Satoshi ${w} in the Fontshare CSS`);
    const res = await fetch('https:' + m[1]);
    if (!res.ok) throw new Error(`fonts: HTTP ${res.status} for Satoshi ${w}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const got = sha256(buf);
    if (got !== PINNED[w]) {
      throw new Error(`fonts: Satoshi ${w} hash changed (${got}). Review the file from Fontshare and update PINNED.`);
    }
    await writeFile(target(w), buf);
    console.log(`fonts: Satoshi ${w} downloaded (${buf.length} bytes)`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
