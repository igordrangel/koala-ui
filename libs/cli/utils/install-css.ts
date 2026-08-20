import { cpSync } from 'node:fs';
import { getOriginPath } from './get-package-root';
import { ensureStylesImport } from './ensure-styles-import';
import { getProjectLayout } from './get-shared-root';
import { getProjectPath } from './project-path';
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
  const { themeRoot } = getProjectLayout(projectFolder);
  const originUtilPath = `${getOriginPath()}/ui/theme/${css}.css`;

  cpSync(originUtilPath, `${themeRoot}/${css}.css`);
  ensureStylesImport(projectFolder, css);
}
