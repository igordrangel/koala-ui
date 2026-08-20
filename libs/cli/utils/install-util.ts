import { cpSync, existsSync } from 'node:fs';
import path from 'node:path';
import { getOriginPath } from './get-package-root';
import { getProjectPath } from './project-path';
import { getSharedRoot } from './get-shared-root';

export const InstallUtilFlagsList = [
  'currency-mask',
  'download-buffer-file',
  'from-observable-with-signal',
  'is-mobile',
  'make-breadcrumb',
  'mime-type-by-extension',
  'string-mask',
  'scroll-into-view',
  'control-changes',
  'form-is-valid',
  'accessibility-select-options-on-keydown',
  'get-value-on-first-change',
] as const;
export type InstallUtilFlags = (typeof InstallUtilFlagsList)[number];

export function installUtil(projectName: string, util: InstallUtilFlags) {
  const projectFolder = getProjectPath(projectName);
  const sharedRoot = getSharedRoot(projectFolder);
  const originUtilPath = `${getOriginPath()}/ui/utils/${util}.ts`;
  const originSpecPath = `${getOriginPath()}/ui/utils/${util}.unit.spec.ts`;
  const targetFolder = `${sharedRoot}/utils`;

  cpSync(originUtilPath, `${targetFolder}/${util}.ts`);

  if (existsSync(originSpecPath)) {
    cpSync(originSpecPath, `${targetFolder}/${util}.unit.spec.ts`);
  }
}
