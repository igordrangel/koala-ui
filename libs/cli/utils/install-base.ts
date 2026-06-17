import { cpSync } from 'node:fs';
import path from 'node:path';
import { getProjectPath } from './project-path';

const originPath = path.join(__dirname, '../../');

export const InstallBaseFlagsList = ['list'] as const;
export type InstallBaseFlags = (typeof InstallBaseFlagsList)[number];

export function installBase(projectName: string, base: InstallBaseFlags) {
  const projectFolder = getProjectPath(projectName);

  cpSync(
    `${originPath}/ui/base/${base}.base.ts`,
    `${projectFolder}/src/app/shared/base/${base}.base.ts`,
  );
}
