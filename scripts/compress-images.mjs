/**
 * Compress public/images/*.jpg in-place (quality 72, progressive, mozjpeg).
 * Run once before deploy: node scripts/compress-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = resolve(__dirname, '../public/images');

const files = readdirSync(DIR).filter(f => /\.jpe?g$/i.test(f));

for (const file of files) {
  const src = join(DIR, file);
  const tmp = src + '.tmp';
  const before = statSync(src).size;
  await sharp(src).jpeg({ quality: 72, progressive: true, mozjpeg: true }).toFile(tmp);
  renameSync(tmp, src);
  const after = statSync(src).size;
  console.log(`${file}: ${(before/1024).toFixed(0)} KB → ${(after/1024).toFixed(0)} KB`);
}
console.log('\nDone.');
