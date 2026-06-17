import { readFileSync } from 'node:fs';
import path from 'node:path';
import { getProjectPath } from './project-path';

export function getPrefix(projectName: string): string | null {
  const projectFolder = getProjectPath(projectName);
  const angularJsonPath = path.join(projectFolder, 'angular.json');
  const prefix = JSON.parse(readFileSync(angularJsonPath, 'utf-8')).projects[projectName].prefix;

  if (prefix !== 'app') {
    return prefix;
  }

  return null;
}
