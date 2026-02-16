/*
 Image optimizer script (Node). Scans public/mediafiles and writes AVIF/WebP resized variants to public/_optimized.
 Requires: npm i sharp glob mkdirp --save-dev
 Run: node scripts/optimize-images.js
*/

import sharp from 'sharp';
// We'll use a small recursive finder instead of glob to avoid platform/glob inconsistencies
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const SOURCE_GLOB = path.join(PUBLIC_DIR, 'mediafiles');
const OUTPUT_DIR = path.resolve(PUBLIC_DIR, '_optimized', 'mediafiles');
const widths = [400, 800, 1200, 2000];

async function processFile(file) {
  const rel = path.relative(path.join(PUBLIC_DIR, 'mediafiles'), file); // preserve subfolders
  const parsed = path.parse(rel);
  const outDir = path.join(OUTPUT_DIR, parsed.dir);
  await fs.promises.mkdir(outDir, { recursive: true });

  const input = file;
  const baseName = parsed.name; // without ext

  console.log('Processing', rel);
  for (const w of widths) {
    const outAvif = path.join(outDir, `${baseName}-${w}.avif`);
    const outWebp = path.join(outDir, `${baseName}-${w}.webp`);

    try {
      await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .avif({ quality: 70 })
        .toFile(outAvif);

      await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(outWebp);
    } catch (err) {
      console.error('Failed to process', input, err);
    }
  }
}

async function findImages(dir, out = []) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await findImages(full, out);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

(async () => {
  try {
    // If the folder doesn't exist, bail
    if (!fs.existsSync(SOURCE_GLOB)) {
      console.log('No mediafiles directory found at', SOURCE_GLOB);
      console.log('Done. Optimized images are in public/_optimized/mediafiles');
      return;
    }

    const files = await findImages(SOURCE_GLOB);
    console.log(`Found ${files.length} images to optimize.`);
    for (const f of files) {
      await processFile(f);
    }
    console.log('Done. Optimized images are in public/_optimized/mediafiles');
  } catch (er) {
    console.error(er);
    process.exit(1);
  }
})();
