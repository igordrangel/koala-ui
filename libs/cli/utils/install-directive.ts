import { cpSync } from 'node:fs';
import path from 'node:path';
import { getProjectPath } from './project-path';

const originPath = path.join(__dirname, '../../');

export const InstallDirectiveFlagsList = ['mask', 'currency'] as const;
export type InstallDirectiveFlags = (typeof InstallDirectiveFlagsList)[number];

export function installDirective(projectName: string, directive: InstallDirectiveFlags) {
  const projectFolder = getProjectPath(projectName);

  cpSync(
    `${originPath}/ui/directives/${directive}.directive.ts`,
    `${projectFolder}/src/app/shared/directives/${directive}.directive.ts`,
  );
}
