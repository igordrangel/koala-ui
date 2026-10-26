import { readFileSync } from 'node:fs';
import path from 'node:path';
import { getProjectPath } from './project-path';
import { resolveAngularProjectName } from './resolve-angular-project';

export function getPrefix(projectName: string): string | null {
  const projectFolder = getProjectPath(projectName);
  const angularJsonPath = path.join(projectFolder, 'angular.json');
  const angularJson = JSON.parse(readFileSync(angularJsonPath, 'utf-8'));
  const resolvedName = resolveAngularProjectName(angularJson, projectName);

  if (!resolvedName) {
    throw new Error(`No projects found in angular.json at ${angularJsonPath}`);
  }

  const prefix = angularJson.projects[resolvedName]?.prefix;

  if (prefix == null) {
    throw new Error(
      `Project "${resolvedName}" in angular.json has no prefix (looked up from "${projectName}")`,
    );
  }

  if (prefix !== 'app') {
    return prefix;
  }

  return null;
}
