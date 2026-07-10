import { readFileSync, writeFileSync } from 'node:fs';

/** Ensures `src/styles.css` imports `./theme/<name>.css` (idempotent). */
export function ensureStylesImport(projectFolder: string, themeCssName: string) {
  const stylesPath = `${projectFolder}/src/styles.css`;
  const stylesContent = readFileSync(stylesPath).toString('utf-8');
  const importStatement = `@import './theme/${themeCssName}.css';\n`;

  if (stylesContent.includes(importStatement)) {
    return;
  }

  const importRegEx = /@import\s+['"][^'"]+['"];/g;

  const lastImportIndex =
    stylesContent.match(importRegEx)?.reduce((lastIndex, match) => {
      const matchIndex = stylesContent.indexOf(match);
      return matchIndex > lastIndex ? matchIndex : lastIndex;
    }, -1) ?? -1;

  const newStylesContent = `${stylesContent.slice(0, lastImportIndex)}${importStatement}${stylesContent.slice(lastImportIndex)}`;

  writeFileSync(stylesPath, newStylesContent);
}
