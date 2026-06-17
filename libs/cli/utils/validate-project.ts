import { existsSync, readFileSync } from 'node:fs';
import { getProjectPath } from './project-path';

export interface ProjectValidation {
  isValid: boolean;
  isAngular: boolean;
  isStandalone: boolean;
  hasPackageJson: boolean;
  hasTsConfig: boolean;
  errors: string[];
}

/**
 * Validates if the project is a valid Angular project
 */
export function validateAngularProject(projectName: string): ProjectValidation {
  const projectPath = getProjectPath(projectName);
  const errors: string[] = [];

  // Check package.json
  const packageJsonPath = `${projectPath}/package.json`;
  const hasPackageJson = existsSync(packageJsonPath);

  if (!hasPackageJson) {
    errors.push('package.json is not found');
    return {
      isValid: false,
      isAngular: false,
      isStandalone: false,
      hasPackageJson: false,
      hasTsConfig: false,
      errors,
    };
  }

  let packageJson;

  try {
    packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  } catch {
    errors.push('Error reading package.json');
    return {
      isValid: false,
      isAngular: false,
      isStandalone: false,
      hasPackageJson: true,
      hasTsConfig: false,
      errors,
    };
  }

  // Check if Angular is present
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const isAngular = !!allDeps['@angular/core'];

  if (!isAngular) {
    errors.push('@angular/core not found in dependencies');
  }

  // Check tsconfig.json
  const tsconfigPath = `${projectPath}/tsconfig.json`;
  const hasTsConfig = existsSync(tsconfigPath);

  if (!hasTsConfig) {
    errors.push('tsconfig.json not found');
  }

  // Check src/main.ts
  const mainTsPath = `${projectPath}/src/main.ts`;
  const hasMainTs = existsSync(mainTsPath);

  if (!hasMainTs) {
    errors.push('src/main.ts not found');
  }

  // Detect if the project is standalone (check for bootstrapApplication vs bootstrapModule)
  let isStandalone = false;
  if (hasMainTs) {
    try {
      const mainContent = readFileSync(mainTsPath, 'utf-8');
      isStandalone = mainContent.includes('bootstrapApplication');
    } catch {
      // ignore error while reading main.ts, fallback to false
    }
  }

  const isValid = isAngular && hasTsConfig && hasMainTs;

  return {
    isValid,
    isAngular,
    isStandalone,
    hasPackageJson,
    hasTsConfig,
    errors: isValid ? [] : errors,
  };
}
