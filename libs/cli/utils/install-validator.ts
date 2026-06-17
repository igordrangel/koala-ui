import { cpSync } from 'node:fs';
import path from 'node:path';
import { getProjectPath } from './project-path';

const originPath = path.join(__dirname, '../../');

export const InstallValidatorFlagsList = ['cpf', 'cnpj'] as const;
export type InstallValidatorFlags = (typeof InstallValidatorFlagsList)[number];

export function installValidator(projectName: string, validator: InstallValidatorFlags) {
  const projectFolder = getProjectPath(projectName);

  cpSync(
    `${originPath}/ui/validators/${validator}.validator.ts`,
    `${projectFolder}/src/app/shared/validators/${validator}.validator.ts`,
  );
}
