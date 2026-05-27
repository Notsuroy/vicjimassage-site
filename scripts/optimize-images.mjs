#!/usr/bin/env node
// Compress all photos to web-friendly JPEG + WebP variants in-place.
// Run: node scripts/optimize-images.mjs

import { readdir, stat, rename } from 'node:fs/promises';
import { resolve, join, extname, basename } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(process.cwd(), 'public');
const TARGETS = [
  { dir: 'photos',  maxWidth: 1920, quality: 82, webpQuality: 80 },
  { dir: 'Reviews', maxWidth: 900,  quality: 80, webpQuality: 78 },
];

async function processFile(filePath, cfg) {
  const before = (await stat(filePath)).size;
  const ext = extname(filePath).toLowerCase();
  const base = basename(filePath, ext);
  const dir = filePath.slice(0, filePath.length - basename(filePath).length);

  // Read original into buffer (so we can overwrite the source safely)
  const img = sharp(filePath).rotate(); // auto-rotate per EXIF

  const meta = await img.metadata();
  const width = meta.width ?? cfg.maxWidth;
  const resize = width > cfg.maxWidth ? cfg.maxWidth : width;

  // 1. Write optimized JPEG (replace original)
  const jpgBuf = await img
    .resize({ width: resize, withoutEnlargement: true })
    .jpeg({ quality: cfg.quality, mozjpeg: true })
    .toBuffer();

  // 2. Write WebP variant alongside
  const webpBuf = await sharp(filePath)
    .rotate()
    .resize({ width: resize, withoutEnlargement: true })
    .webp({ quality: cfg.webpQuality })
    .toBuffer();

  const jpgOut = join(dir, base + '.jpeg').replace(/\.jpeg$/i, '.jpeg');
  // For .jpg files, normalize to .jpeg for consistency? leave alone
  const jpgFinal = filePath; // overwrite original
  const webpFinal = join(dir, base + '.webp');

  // Write
  await sharp(jpgBuf).toFile(jpgFinal + '.tmp');
  await rename(jpgFinal + '.tmp', jpgFinal);
  await sharp(webpBuf).toFile(webpFinal);

  const after = (await stat(jpgFinal)).size;
  const webpSize = (await stat(webpFinal)).size;
  return { before, after, webpSize };
}

(async () => {
  let totalBefore = 0, totalAfter = 0, totalWebp = 0;
  for (const cfg of TARGETS) {
    const dir = resolve(ROOT, cfg.dir);
    const files = (await readdir(dir)).filter(f => /\.(jpe?g|png)$/i.test(f));
    console.log(`\n[${cfg.dir}] ${files.length} files`);
    for (const f of files) {
      try {
        const r = await processFile(join(dir, f), cfg);
        totalBefore += r.before;
        totalAfter += r.after;
        totalWebp += r.webpSize;
        const beforeKB = (r.before / 1024).toFixed(0);
        const afterKB = (r.after / 1024).toFixed(0);
        const webpKB = (r.webpSize / 1024).toFixed(0);
        const pct = (100 * (1 - r.after / r.before)).toFixed(0);
        console.log(`  ${f}  ${beforeKB}KB -> JPEG ${afterKB}KB (-${pct}%) + WebP ${webpKB}KB`);
      } catch (e) {
        console.error(`  ${f} FAILED: ${e.message}`);
      }
    }
  }
  const mb = (n) => (n / 1024 / 1024).toFixed(2);
  console.log(`\nTotal: ${mb(totalBefore)}MB -> JPEG ${mb(totalAfter)}MB + WebP ${mb(totalWebp)}MB`);
  console.log(`JPEG savings: ${(100 * (1 - totalAfter / totalBefore)).toFixed(0)}%`);
  console.log(`WebP savings: ${(100 * (1 - totalWebp / totalBefore)).toFixed(0)}%`);
})();
