import { cpSync } from 'node:fs';
import path from 'node:path';
import { getOriginPath } from './get-package-root';
import { getProjectPath } from './project-path';
import { getSharedRoot } from './get-shared-root';
export const InstallValidatorFlagsList = ['cpf', 'cnpj'] as const;
export type InstallValidatorFlags = (typeof InstallValidatorFlagsList)[number];

export function installValidator(projectName: string, validator: InstallValidatorFlags) {
  const projectFolder = getProjectPath(projectName);
  const sharedRoot = getSharedRoot(projectFolder);

  cpSync(
    `${getOriginPath()}/ui/validators/${validator}.validator.ts`,
    `${sharedRoot}/validators/${validator}.validator.ts`,
  );
}
