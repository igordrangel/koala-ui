import { existsSync, readFileSync } from 'node:fs';
import { InstallBaseFlags } from './install-base';
import { InstallComponentFlags } from './install-component';
import { InstallCoreResourceFlags } from './install-core-resource';
import { InstallCssFlags } from './install-css';
import { InstallDirectiveFlags } from './install-directive';
import { InstallUtilFlags } from './install-util';
import { InstallValidatorFlags } from './install-validator';
import { getProjectPath } from './project-path';

export type PackageType =
  | 'component'
  | 'validator'
  | 'directives'
  | 'utils'
  | 'lib'
  | 'base'
  | 'core-resource'
  | 'css';

export function getNotInstalled(
  projectName: string,
  type: 'component',
  deps: InstallComponentFlags[],
): InstallComponentFlags[];

export function getNotInstalled(
  projectName: string,
  type: 'validator',
  deps: InstallValidatorFlags[],
): InstallValidatorFlags[];

export function getNotInstalled(
  projectName: string,
  type: 'directives',
  deps: InstallDirectiveFlags[],
): InstallDirectiveFlags[];

export function getNotInstalled(
  projectName: string,
  type: 'utils',
  deps: InstallUtilFlags[],
): InstallUtilFlags[];

export function getNotInstalled(
  projectName: string,
  type: 'base',
  deps: InstallBaseFlags[],
): InstallBaseFlags[];

export function getNotInstalled(
  projectName: string,
  type: 'core-resource',
  deps: InstallCoreResourceFlags[],
): InstallCoreResourceFlags[];

export function getNotInstalled(
  projectName: string,
  type: 'css',
  deps: InstallCssFlags[],
): InstallCssFlags[];

export function getNotInstalled(projectName: string, type: 'lib', deps: string[]): string[];

export function getNotInstalled(projectName: string, type: PackageType, deps: string[]): string[] {
  const notInstalled: string[] = [];

  switch (type) {
    case 'component': {
      const projectFolder = getProjectPath(projectName);

      for (const dep of deps) {
        if (!existsSync(`${projectFolder}/src/app/shared/components/${dep}`)) {
          notInstalled.push(dep);
        }
      }
      break;
    }
    case 'directives': {
      const projectFolder = getProjectPath(projectName);

      for (const dep of deps) {
        if (!existsSync(`${projectFolder}/src/app/shared/directives/${dep}.directive.ts`)) {
          notInstalled.push(dep);
        }
      }
      break;
    }
    case 'validator': {
      const projectFolder = getProjectPath(projectName);

      for (const dep of deps) {
        if (!existsSync(`${projectFolder}/src/app/shared/validators/${dep}.validator.ts`)) {
          notInstalled.push(dep);
        }
      }
      break;
    }
    case 'utils': {
      const projectFolder = getProjectPath(projectName);

      for (const dep of deps) {
        if (!existsSync(`${projectFolder}/src/app/shared/utils/${dep}.ts`)) {
          notInstalled.push(dep);
        }
      }
      break;
    }
    case 'lib': {
      const packageJsonPath = `${getProjectPath(projectName)}/package.json`;
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      for (const item of deps) {
        if (!packageJson.dependencies?.[item] && !packageJson.devDependencies?.[item]) {
          notInstalled.push(item);
        }
      }
      break;
    }
    case 'base': {
      const projectFolder = getProjectPath(projectName);

      for (const dep of deps) {
        if (!existsSync(`${projectFolder}/src/app/shared/base/${dep}`)) {
          notInstalled.push(dep);
        }
      }
      break;
    }
    case 'core-resource': {
      const projectFolder = getProjectPath(projectName);

      for (const dep of deps) {
        if (!existsSync(`${projectFolder}/src/app/core/${dep}`)) {
          notInstalled.push(dep);
        }
      }
      break;
    }
    case 'css': {
      const projectFolder = getProjectPath(projectName);

      for (const dep of deps) {
        if (!existsSync(`${projectFolder}/src/theme/${dep}`)) {
          notInstalled.push(dep);
        }
      }
      break;
    }
  }

  return notInstalled;
}
