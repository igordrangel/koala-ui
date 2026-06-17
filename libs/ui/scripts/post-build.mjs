import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve('../../dist/browser');
const indexFile = path.join(outputDir, 'index.html');
const notFoundFile = path.join(outputDir, '404.html');

if (!fs.existsSync(indexFile)) {
  console.error('index.html não encontrado em', outputDir);
  process.exit(1);
}

fs.copyFileSync(indexFile, notFoundFile);

for (const file of fs.readdirSync(outputDir)) {
  if (file.endsWith('.map')) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

console.log('404.html gerado para GitHub Pages (SPA fallback)');
console.log('Source maps removidos do artefato de deploy');
