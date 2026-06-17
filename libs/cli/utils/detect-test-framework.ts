import { existsSync, readFileSync } from 'node:fs';
import { getProjectPath } from './project-path';

export type TestFramework = 'vitest' | 'jest' | 'karma' | 'playwright' | 'none';

export interface TestFrameworkConfig {
  unit: TestFramework;
  e2e: TestFramework;
  hasTestScripts: boolean;
}

/**
 * Detecta qual framework de testes está configurado no projeto
 */
export function detectTestFramework(projectName: string): TestFrameworkConfig {
  const projectPath = getProjectPath(projectName);
  const packageJsonPath = `${projectPath}/package.json`;

  if (!existsSync(packageJsonPath)) {
    return { unit: 'none', e2e: 'none', hasTestScripts: false };
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    scripts?: Record<string, string>;
  };

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // Detectar framework unitário
  let unitFramework: TestFramework = 'none';
  if (allDeps.vitest) {
    unitFramework = 'vitest';
  } else if (allDeps.jest) {
    unitFramework = 'jest';
  } else if (allDeps.karma) {
    unitFramework = 'karma';
  }

  // Detectar framework e2e
  let e2eFramework: TestFramework = 'none';
  if (allDeps['@playwright/test']) {
    e2eFramework = 'playwright';
  }

  // Verificar se existem scripts de teste
  const hasTestScripts = !!(
    packageJson.scripts?.test ||
    packageJson.scripts?.['test:unit'] ||
    packageJson.scripts?.e2e
  );

  // Verificar arquivos de configuração
  const hasVitestConfig =
    existsSync(`${projectPath}/vitest.config.ts`) ||
    existsSync(`${projectPath}/vitest.config.js`) ||
    existsSync(`${projectPath}/vitest.config.mts`);

  const hasPlaywrightConfig =
    existsSync(`${projectPath}/playwright.config.ts`) ||
    existsSync(`${projectPath}/playwright.config.js`);

  const hasJestConfig =
    existsSync(`${projectPath}/jest.config.ts`) ||
    existsSync(`${projectPath}/jest.config.js`) ||
    existsSync(`${projectPath}/jest.config.json`) ||
    existsSync(`${projectPath}/jest.config.cjs`);

  const hasKarmaConfig = existsSync(`${projectPath}/karma.conf.js`);

  // Se temos um arquivo de config mas não a dependência, confirmar
  if (hasVitestConfig && unitFramework === 'none') {
    unitFramework = 'vitest';
  } else if (hasJestConfig && unitFramework === 'none') {
    unitFramework = 'jest';
  } else if (hasKarmaConfig && unitFramework === 'none') {
    unitFramework = 'karma';
  }

  if (hasPlaywrightConfig && e2eFramework === 'none') {
    e2eFramework = 'playwright';
  }

  return {
    unit: unitFramework,
    e2e: e2eFramework,
    hasTestScripts,
  };
}

/**
 * Verifica se o projeto já tem testes configurados
 */
export function hasTestsConfigured(projectName: string): boolean {
  const config = detectTestFramework(projectName);
  return config.unit !== 'none' || config.e2e !== 'none';
}
