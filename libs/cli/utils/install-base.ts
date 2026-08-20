import { cpSync } from 'node:fs';
import path from 'node:path';
import { getOriginPath } from './get-package-root';
import { getProjectPath } from './project-path';
import { getSharedRoot } from './get-shared-root';
export const InstallBaseFlagsList = ['list', 'http', 'page'] as const;
export type InstallBaseFlags = (typeof InstallBaseFlagsList)[number];

export function installBase(projectName: string, base: InstallBaseFlags) {
  const projectFolder = getProjectPath(projectName);
  const sharedRoot = getSharedRoot(projectFolder);

  cpSync(
    `${getOriginPath()}/ui/base/${base}.base.ts`,
    `${sharedRoot}/base/${base}.base.ts`,
  );
}
