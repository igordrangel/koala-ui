import { cpSync } from 'node:fs';
import path from 'node:path';
import { ensureStylesImport } from './ensure-styles-import';
import { getProjectPath } from './project-path';

const originPath = path.join(__dirname, '../../');

export const InstallCssFlagsList = [
  'table',
  'toast',
  'side-window',
  'bottom-sheet',
  'modal',
  'editor',
] as const;
export type InstallCssFlags = (typeof InstallCssFlagsList)[number];

export function installCss(projectName: string, css: InstallCssFlags) {
  const projectFolder = getProjectPath(projectName);
  const originUtilPath = `${originPath}/ui/theme/${css}.css`;
  const targetFolder = `${projectFolder}/src/theme`;

  cpSync(originUtilPath, `${targetFolder}/${css}.css`);
  ensureStylesImport(projectFolder, css);
}
