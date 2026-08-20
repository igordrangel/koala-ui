import { readFileSync, writeFileSync } from 'node:fs';
import { getProjectLayout } from './get-shared-root';

/** Ensures styles.css imports `./theme/<name>.css` (idempotent). */
export function ensureStylesImport(projectFolder: string, themeCssName: string) {
  const { stylesPath } = getProjectLayout(projectFolder);
  const stylesContent = readFileSync(stylesPath).toString('utf-8');
  const importStatement = `@import './theme/${themeCssName}.css';\n`;

  if (stylesContent.includes(importStatement)) {
    return;
  }

  const importRegEx = /@import\s+['"][^'"]+['"];/g;
  const imports = stylesContent.match(importRegEx);

  if (!imports?.length) {
    writeFileSync(stylesPath, `${importStatement}${stylesContent}`);
    return;
  }

  const lastImportIndex = imports.reduce((lastIndex, match) => {
    const matchIndex = stylesContent.indexOf(match, lastIndex === -1 ? 0 : lastIndex);
    return matchIndex > lastIndex ? matchIndex : lastIndex;
  }, -1);

  const newStylesContent = `${stylesContent.slice(0, lastImportIndex)}${importStatement}${stylesContent.slice(lastImportIndex)}`;

  writeFileSync(stylesPath, newStylesContent);
}
