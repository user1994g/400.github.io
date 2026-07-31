import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, 'mobile', 'www');
const sources = ['index.html', 'applications', 'assets', 'site.webmanifest'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const source of sources) {
  await cp(path.join(root, source), path.join(output, source), {
    recursive: true,
    filter: (entry) => path.basename(entry) !== '.DS_Store'
  });
}

console.log('Prepared the netvistastudio mobile web bundle.');
