import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDir = resolve(process.argv[2] ?? 'docs');

await mkdir(outputDir, { recursive: true });
await copyFile(resolve(outputDir, 'index.html'), resolve(outputDir, '404.html'));

console.log(`Created GitHub Pages fallback: ${resolve(outputDir, '404.html')}`);
