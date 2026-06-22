import { cpSync, existsSync } from 'node:fs';
import path from 'node:path';
import { getProjectPath } from './project-path';

const originPath = path.join(__dirname, '../../');

export const InstallUtilFlagsList = [
  'currency-mask',
  'download-buffer-file',
  'is-mobile',
  'make-breadcrumb',
  'mime-type-by-extension',
  'string-mask',
  'scroll-into-view',
  'control-changes',
  'form-is-valid',
  'accessibility-select-options-on-keydown',
] as const;
export type InstallUtilFlags = (typeof InstallUtilFlagsList)[number];

export function installUtil(projectName: string, util: InstallUtilFlags) {
  const projectFolder = getProjectPath(projectName);
  const originUtilPath = `${originPath}/ui/utils/${util}.ts`;
  const originSpecPath = `${originPath}/ui/utils/${util}.unit.spec.ts`;
  const targetFolder = `${projectFolder}/src/app/shared/utils`;

  cpSync(originUtilPath, `${targetFolder}/${util}.ts`);

  if (existsSync(originSpecPath)) {
    cpSync(originSpecPath, `${targetFolder}/${util}.unit.spec.ts`);
  }
}
