// Render and save og-en.png + og-pt.png via the remote Browserless service.
// Run: node scripts/generate-og.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { htmlFor } from './og-template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicDir   = path.join(projectRoot, 'public');

// Read browserless creds from ../../api/.env (re-use the API config — single source of truth).
async function loadApiEnv() {
  const envPath = path.resolve(projectRoot, '..', '..', 'api', '.env');
  const raw = await fs.readFile(envPath, 'utf8');
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^"|"$/g, '');
  }
  return out;
}

async function shoot(html, outPath) {
  const env = await loadApiEnv();
  const base  = (env.BROWSERLESS_URL || '').replace(/\/+$/, '');
  const token = env.BROWSERLESS_TOKEN || '';
  if (!base || !token) throw new Error('BROWSERLESS_URL / BROWSERLESS_TOKEN missing in api/.env');

  const url = `${base}/screenshot?token=${encodeURIComponent(token)}`;
  const body = {
    html,
    viewport: { width: 1200, height: 630, deviceScaleFactor: 1 },
    options:  { type: 'png', fullPage: false, omitBackground: false },
    gotoOptions: { waitUntil: 'networkidle0', timeout: 30000 },
    // Give Google Fonts time to settle before screenshot.
    waitForTimeout: 1500,
  };

  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '<no body>');
    throw new Error(`Browserless ${r.status}: ${txt.slice(0, 400)}`);
  }
  const buf = Buffer.from(await r.arrayBuffer());
  await fs.writeFile(outPath, buf);
  console.log(`✓ ${path.relative(projectRoot, outPath)}  (${(buf.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });
  for (const locale of ['en', 'pt']) {
    const html = htmlFor(locale);
    await shoot(html, path.join(publicDir, `og-${locale}.png`));
  }
}

main().catch((e) => { console.error('OG generation failed:', e.message); process.exit(1); });
