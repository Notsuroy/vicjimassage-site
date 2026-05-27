#!/usr/bin/env node
// Generates GBP-friendly photo variants from Vicji's existing photos.
// Output: public/gbp/* (all sized to GBP recommended aspect ratios)
// Run: node scripts/prep-gbp-photos.mjs

import { resolve } from 'node:path';
import sharp from 'sharp';

const SRC = resolve(process.cwd(), 'public', 'photos');
const OUT = resolve(process.cwd(), 'public', 'gbp');

const tasks = [
  // Profile photo (logo slot, square, tight crop of face)
  { src: 'portrait.jpg', out: 'profile.jpg', size: [720, 720], position: 'top' },
  // Cover photo (16:9 landscape, hero shot)
  { src: 'hero.jpg', out: 'cover.jpg', size: [1920, 1080], position: 'center' },
  // Interior / "at work" photos (4:3 landscape, action shots)
  { src: 'gallery-04.jpg', out: 'at-work-01.jpg', size: [1440, 1080], position: 'center' },
  { src: 'gallery-08.jpg', out: 'at-work-02.jpg', size: [1440, 1080], position: 'center' },
  { src: 'gallery-09.jpg', out: 'at-work-03.jpg', size: [1440, 1080], position: 'center' },
  // Team / personality photos (portrait)
  { src: 'gallery-05.jpg', out: 'team-01.jpg', size: [1080, 1350], position: 'top' },
  { src: 'gallery-07.jpg', out: 'team-02.jpg', size: [1080, 1350], position: 'top' },
  // Extra: meditative portrait (good for "about" tab on GBP)
  { src: 'portrait-meditative.jpg', out: 'team-03.jpg', size: [1080, 1350], position: 'top' },
];

for (const t of tasks) {
  const src = `${SRC}/${t.src}`;
  const out = `${OUT}/${t.out}`;
  try {
    const img = await sharp(src).rotate();
    const meta = await img.metadata();
    console.log(`${t.src} (${meta.width}x${meta.height}) -> ${t.out} (${t.size.join('x')})`);

    await sharp(src)
      .rotate()
      .resize({
        width: t.size[0],
        height: t.size[1],
        fit: 'cover',
        position: t.position,
      })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(out);
  } catch (e) {
    console.error(`  ${t.src} FAILED: ${e.message}`);
  }
}
console.log('\nAll GBP photos generated in public/gbp/');
