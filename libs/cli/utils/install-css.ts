import { cpSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getProjectPath } from './project-path';

const originPath = path.join(__dirname, '../../');

export const InstallCssFlagsList = [
  'table',
  'toast',
  'side-window',
  'bottom-sheet',
  'modal',
] as const;
export type InstallCssFlags = (typeof InstallCssFlagsList)[number];

export function installCss(projectName: string, css: InstallCssFlags) {
  const projectFolder = getProjectPath(projectName);
  const originUtilPath = `${originPath}/ui/theme/${css}.css`;
  const targetFolder = `${projectFolder}/src/theme`;

  cpSync(originUtilPath, `${targetFolder}/${css}.css`);

  const stylesPath = `${projectFolder}/src/styles.css`;
  const stylesContent = readFileSync(stylesPath).toString('utf-8');

  const importStatement = `@import './theme/${css}.css';\n`;

  if (!stylesContent.includes(importStatement)) {
    const importRegEx = /@import\s+['"][^'"]+['"];/g;

    const lastImportIndex =
      stylesContent.match(importRegEx)?.reduce((lastIndex, match) => {
        const matchIndex = stylesContent.indexOf(match);
        return matchIndex > lastIndex ? matchIndex : lastIndex;
      }, -1) ?? -1;

    const newStylesContent = `${stylesContent.slice(0, lastImportIndex)}${importStatement}${stylesContent.slice(lastImportIndex)}`;

    writeFileSync(stylesPath, newStylesContent);
  }
}
