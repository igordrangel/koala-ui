import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { detectPackageManager, getPmCommands } from './package-manager';
import { getProjectPath } from './project-path';
import { runCommand } from './run-command';

const PLAYWRIGHT_CONFIG = `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/app/shared/components',
  testMatch: '**/*.e2e.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4310',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx ng serve --configuration e2e --host 127.0.0.1 --port 4310',
    url: 'http://127.0.0.1:4310',
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
`;

async function ensurePlaywrightDependency(projectName: string, verbose = false) {
  const projectPath = getProjectPath(projectName);
  const packageJsonPath = `${projectPath}/package.json`;
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  if (
    packageJson.dependencies?.['@playwright/test'] ||
    packageJson.devDependencies?.['@playwright/test']
  ) {
    return;
  }

  const pm = getPmCommands(detectPackageManager(projectName));
  await runCommand(`${pm.installDev} @playwright/test`, {
    cwd: projectPath,
    loaderText: 'Installing Playwright',
    verbose,
  });
}

function ensurePlaywrightScripts(projectName: string) {
  const projectPath = getProjectPath(projectName);
  const packageJsonPath = `${projectPath}/package.json`;
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
    scripts?: Record<string, string>;
  };

  packageJson.scripts ??= {};
  packageJson.scripts.e2e ??= 'playwright test';
  packageJson.scripts['e2e:headed'] ??= 'playwright test --headed';
  packageJson.scripts['e2e:ui'] ??= 'playwright test --ui';

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function ensurePlaywrightConfig(projectName: string) {
  const projectPath = getProjectPath(projectName);
  const configPath = `${projectPath}/playwright.config.ts`;

  if (existsSync(configPath)) {
    const configContent = readFileSync(configPath, 'utf-8');
    const updatedContent = configContent
      .replace("baseURL: 'http://127.0.0.1:4300'", "baseURL: 'http://127.0.0.1:4310'")
      .replace(
        "command: 'npx ng serve --host 127.0.0.1 --port 4300'",
        "command: 'npx ng serve --configuration e2e --host 127.0.0.1 --port 4310'",
      )
      .replace(
        "command: 'npx ng serve --configuration e2e --host 127.0.0.1 --port 4300'",
        "command: 'npx ng serve --configuration e2e --host 127.0.0.1 --port 4310'",
      )
      .replace("url: 'http://127.0.0.1:4300'", "url: 'http://127.0.0.1:4310'")
      .replace('reuseExistingServer: true', 'reuseExistingServer: false');

    if (updatedContent !== configContent) {
      writeFileSync(configPath, updatedContent, 'utf-8');
    }

    return;
  }

  writeFileSync(configPath, PLAYWRIGHT_CONFIG);
}

export async function setupPlaywright(projectName: string, verbose = false) {
  await ensurePlaywrightDependency(projectName, verbose);
  ensurePlaywrightScripts(projectName);
  ensurePlaywrightConfig(projectName);
}
