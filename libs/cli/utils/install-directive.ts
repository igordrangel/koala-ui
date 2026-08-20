import { cpSync } from 'node:fs';
import path from 'node:path';
import { getOriginPath } from './get-package-root';
import { getProjectPath } from './project-path';
import { getSharedRoot } from './get-shared-root';
export const InstallDirectiveFlagsList = ['mask', 'currency'] as const;
export type InstallDirectiveFlags = (typeof InstallDirectiveFlagsList)[number];

export function installDirective(projectName: string, directive: InstallDirectiveFlags) {
  const projectFolder = getProjectPath(projectName);
  const sharedRoot = getSharedRoot(projectFolder);

  cpSync(
    `${getOriginPath()}/ui/directives/${directive}.directive.ts`,
    `${sharedRoot}/directives/${directive}.directive.ts`,
  );
}
