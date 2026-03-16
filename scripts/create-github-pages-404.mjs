import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const docsDir = resolve('docs');

await copyFile(resolve(docsDir, 'index.html'), resolve(docsDir, '404.html'));
