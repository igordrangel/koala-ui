import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { logStep, logSuccess, logWarning } from './cli-ui';
import { detectTestFramework } from './detect-test-framework';
import { detectPackageManager, getPmCommands, getProjectExecCommand } from './package-manager';
import { getProjectPath } from './project-path';
import { runCommand } from './run-command';
import { setupGlobalTests } from './setup-global-tests';
import { validateAngularProject } from './validate-project';
import { installUtil } from './install-util';

const originPath = path.join(__dirname, '../../');

/**
 * Performs adaptive setup of a pre-existing Angular project
 */
export async function setupExistingProject(projectName: string, verbose = false): Promise<void> {
  const logger = console.log;
  const projectPath = getProjectPath(projectName);

  // Validate project
  logStep(logger, 'Validating Angular project...');
  const validation = validateAngularProject(projectName);

  if (!validation.isValid) {
    const errorMsg = validation.errors.join('\n  - ');
    throw new Error(`Invalid project:\n  - ${errorMsg}`);
  }

  logSuccess(logger, 'Valid Angular project');

  // Create shared folder structure
  logStep(logger, 'Creating folder structure...');
  const requiredDirs = ['src/app/shared', 'src/theme/icons'];

  for (const dir of requiredDirs) {
    const fullPath = `${projectPath}/${dir}`;
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
    }
  }

  logSuccess(logger, 'Folder structure created/verified');

  // Copy themes and icons if they do not exist
  logStep(logger, 'Configuring themes...');
  const themeIconsPath = `${projectPath}/src/theme/icons`;
  const originIconsPath = `${originPath}/ui/theme/icons`;

  if (!existsSync(`${themeIconsPath}/font-awesome`)) {
    if (existsSync(originIconsPath)) {
      try {
        cpSync(`${originIconsPath}`, `${themeIconsPath}`, { recursive: true });
        logSuccess(logger, 'Icons copied');
      } catch {
        logWarning(logger, 'Failed to copy icons - continue manually if necessary');
      }
    }
  }

  const gridPath = `${projectPath}/src/theme/grid.css`;
  if (!existsSync(gridPath)) {
    const originGridPath = `${originPath}/ui/theme/grid.css`;
    if (existsSync(originGridPath)) {
      try {
        cpSync(originGridPath, gridPath);
      } catch {
        logWarning(logger, 'Failed to copy grid.css');
      }
    }
  }

  const animationsPath = `${projectPath}/src/theme/animations.css`;
  if (!existsSync(animationsPath)) {
    const originAnimationsPath = `${originPath}/ui/theme/animations.css`;
    if (existsSync(originAnimationsPath)) {
      try {
        cpSync(originAnimationsPath, animationsPath);
      } catch {
        logWarning(logger, 'Failed to copy animations.css');
      }
    }
  }

  const tablePath = `${projectPath}/src/theme/table.css`;
  if (!existsSync(tablePath)) {
    const originTablePath = `${originPath}/ui/theme/table.css`;
    if (existsSync(originTablePath)) {
      try {
        cpSync(originTablePath, tablePath);
      } catch {
        logWarning(logger, 'Failed to copy table.css');
      }
    }
  }

  mkdirSync(`${projectPath}/public/assets/icons`, { recursive: true });

  const generateIconsPath = `${projectPath}/generate-icons.js`;
  if (!existsSync(generateIconsPath)) {
    const originGenerateIconsPath = `${originPath}/ui/generate-icons.js`;
    if (existsSync(originGenerateIconsPath)) {
      try {
        cpSync(originGenerateIconsPath, generateIconsPath);
      } catch {
        logWarning(logger, 'Failed to copy generate-icons.js');
      }
    }
  }

  // Detect already configured tests
  logStep(logger, 'Detecting already configured tests...');
  const testConfig = detectTestFramework(projectName);

  if (testConfig.unit !== 'none' || testConfig.e2e !== 'none') {
    logSuccess(logger, `Tests found: Unit=${testConfig.unit}, E2E=${testConfig.e2e}`);
  } else {
    logWarning(logger, 'No test configuration found. Setting up default tests...');

    // Install test dependencies
    await setupGlobalTests(projectName, verbose);
    logSuccess(logger, 'Tests configured');
  }

  // Check and install base dependencies
  logStep(logger, 'Checking dependencies...');
  const packageJsonPath = `${projectPath}/package.json`;
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
    scripts: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  if (!packageJson.scripts.prestart) {
    packageJson.scripts.prestart = 'node generate-icons.js';
  }

  if (!packageJson.scripts.prebuild) {
    packageJson.scripts.prebuild = 'node generate-icons.js';
  }

  if (!packageJson.scripts['build:dev']) {
    packageJson.scripts['build:dev'] =
      'node generate-icons.js && ng build --configuration development';
  }

  if (!packageJson.scripts['build:prod']) {
    packageJson.scripts['build:prod'] =
      'node generate-icons.js && ng build --configuration production';
  }

  writeFileSync(`${packageJsonPath}`, JSON.stringify(packageJson, null, 2));

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const requiredDeps = ['@koalarx/utils', 'clsx'];
  const missingDeps = requiredDeps.filter((dep) => !allDeps[dep]);

  if (missingDeps.length > 0) {
    const packagesToInstall = missingDeps.map((dep) =>
      dep === '@koalarx/utils' ? '@koalarx/utils@^5.0.0' : dep,
    );
    logStep(logger, `Installing base dependencies: ${packagesToInstall.join(', ')}...`);
    const pm = getPmCommands(detectPackageManager(projectName));
    await runCommand(`${pm.install} ${packagesToInstall.join(' ')}`, {
      cwd: projectPath,
      verbose,
      loaderText: 'Installing base dependencies',
    });
    logSuccess(logger, 'Base dependencies installed');
  } else {
    logSuccess(logger, 'All base dependencies are already installed');
  }

  // Check ESLint
  logStep(logger, 'Checking linting configuration...');
  const eslintConfigPath = `${projectPath}/eslint.config.mts`;
  if (!existsSync(eslintConfigPath)) {
    const originEslintPath = `${originPath}/ui/eslint.config.mts`;
    if (existsSync(originEslintPath)) {
      try {
        cpSync(originEslintPath, eslintConfigPath);
        logSuccess(logger, 'ESLint configuration copied');
      } catch {
        logWarning(logger, 'Failed to copy eslint.config.mts');
      }
    }
  } else {
    logSuccess(logger, 'ESLint already configured');
  }

  // Configure VS Code settings
  logStep(logger, 'Checking VS Code configuration...');
  const vscodeDir = `${projectPath}/.vscode`;
  const vscodeSettingsPath = `${vscodeDir}/settings.json`;
  const originVscodeSettingsPath = `${originPath}/ui/.vscode/settings.json`;

  if (!existsSync(vscodeSettingsPath) && existsSync(originVscodeSettingsPath)) {
    try {
      mkdirSync(vscodeDir, { recursive: true });
      cpSync(originVscodeSettingsPath, vscodeSettingsPath);
      logSuccess(logger, 'VS Code configuration copied');
    } catch {
      logWarning(logger, 'Failed to copy VS Code settings.json');
    }
  } else if (existsSync(vscodeSettingsPath)) {
    logSuccess(logger, 'VS Code already configured');
  }

  installUtil(projectName, 'control-changes');
  installUtil(projectName, 'form-is-valid');

  const pm = detectPackageManager(projectName);

  await runCommand(getProjectExecCommand(pm, 'eslint . --fix'), {
    cwd: projectPath,
    verbose,
    loaderText: 'Linting project',
  });
  await runCommand(getProjectExecCommand(pm, 'prettier . --write'), {
    cwd: projectPath,
    verbose,
    loaderText: 'Formatting project',
  });

  logSuccess(logger, 'Setup completed successfully!');
}
