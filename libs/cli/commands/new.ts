import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { logHeader, logSuccess } from '../utils/cli-ui';
import {
  askPackageManager,
  getAngularCreateCommand,
  getPmCommands,
  getProjectExecCommand,
  PackageManager,
  PmCommands,
} from '../utils/package-manager';
import { withVersions } from '../utils/dependency-versions';
import { runCommand } from '../utils/run-command';
import { setupGlobalTests } from '../utils/setup-global-tests';
import { installUtil } from '../utils/install-util';
import { applyAiContext, resolveAiContextTargets } from '../utils/apply-ai-context';

const originPath = path.join(__dirname, '../../');

export interface NewArgs {
  name: string;
  pm?: PackageManager;
  verbose?: boolean;
  aiContext?: string;
  /** Accept defaults without prompts (package manager + AI context). */
  silent?: boolean;
}

async function createAngularProject(
  name: string,
  pmName: PackageManager,
  pm: PmCommands,
  verbose = false,
): Promise<void> {
  await runCommand(getAngularCreateCommand(name, pmName), {
    verbose,
    loaderText: `Creating project ${name}`,
  });
  await runCommand(`${pm.install} ${withVersions(['@koalarx/utils', 'clsx']).join(' ')}`, {
    cwd: name,
    verbose,
    loaderText: 'Installing base dependencies',
  });
  await runCommand(
    `${pm.installDev} ${withVersions([
      'angular-eslint',
      '@vitest/eslint-plugin',
      'eslint-plugin-prettier',
      'typescript-eslint',
      'daisyui',
      '@types/node',
    ]).join(' ')}`,
    {
      cwd: name,
      verbose,
      loaderText: 'Installing development dependencies',
    },
  );

  const angularJson = JSON.parse(readFileSync(`${name}/angular.json`, 'utf-8'));
  angularJson.projects[name].architect.build.options.styles.push(
    'src/theme/icons/font-awesome/css/all.min.css',
  );
  writeFileSync(`${name}/angular.json`, JSON.stringify(angularJson, null, 2));
  cpSync(`${originPath}/ui/theme/icons`, `${name}/src/theme/icons`, { recursive: true });
  cpSync(`${originPath}/ui/theme/grid.css`, `${name}/src/theme/grid.css`);
  cpSync(`${originPath}/ui/generate-icons.js`, `${name}/generate-icons.js`);

  await runCommand('node generate-icons.js', {
    cwd: name,
    verbose,
    loaderText: 'Generating icons',
  });

  const vscodeSettingsPath = `${originPath}/ui/.vscode/settings.json`;
  if (existsSync(vscodeSettingsPath)) {
    cpSync(vscodeSettingsPath, `${name}/.vscode/settings.json`);
  }
}

function createFolderStructure(name: string) {
  rmSync(`${name}/src/app/app.css`);

  const indexHtml = readFileSync(`${originPath}/ui/index.html`, 'utf-8');
  writeFileSync(`${name}/src/index.html`, indexHtml.replace('@koalarx/ui', name));

  const appTs = readFileSync(`${name}/src/app/app.ts`, 'utf-8');
  writeFileSync(
    `${name}/src/app/app.ts`,
    appTs.replace("styleUrl: './app.css',", '').replace("styleUrl: './app.css'", ''),
  );

  const styles = readFileSync(`${originPath}/ui/styles.css`, 'utf-8');
  writeFileSync(`${name}/src/styles.css`, styles);

  const tsConfig = JSON.parse(
    readFileSync(`${name}/tsconfig.json`, 'utf-8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''),
  );
  tsConfig.compilerOptions.paths = { '@/*': ['./src/app/*'] };
  writeFileSync(`${name}/tsconfig.json`, JSON.stringify(tsConfig, null, 2));

  const tsConfigApp = JSON.parse(
    readFileSync(`${name}/tsconfig.app.json`, 'utf-8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''),
  );
  tsConfigApp.compilerOptions.rootDir = './src';
  tsConfigApp.compilerOptions.types = ['node'];
  tsConfigApp.include = ['src/**/*.ts'];
  tsConfigApp.exclude = ['src/**/*.spec.ts'];
  writeFileSync(`${name}/tsconfig.app.json`, JSON.stringify(tsConfigApp, null, 2));

  const tsConfigSpec = JSON.parse(
    readFileSync(`${name}/tsconfig.spec.json`, 'utf-8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''),
  );
  tsConfigSpec.compilerOptions.rootDir = './src';
  tsConfigSpec.compilerOptions.types = ['node'];
  tsConfigSpec.include = ['src/**/*.d.ts', 'src/**/*.spec.ts'];
  writeFileSync(`${name}/tsconfig.spec.json`, JSON.stringify(tsConfigSpec, null, 2));

  cpSync(`${originPath}/ui/eslint.config.mts`, `${name}/eslint.config.mts`);

  const packageJson = JSON.parse(readFileSync(`${name}/package.json`, 'utf-8'));
  packageJson.scripts = {
    ...packageJson.scripts,
    prestart: 'node generate-icons.js',
    prebuild: 'node generate-icons.js',
    'build:dev': 'node generate-icons.js && ng build --configuration development',
    'build:prod': 'node generate-icons.js && ng build --configuration production',
  };
  writeFileSync(`${name}/package.json`, JSON.stringify(packageJson, null, 2));

  mkdirSync(`${name}/src/app/shared`, { recursive: true });
  mkdirSync(`${name}/public/assets/icons`, { recursive: true });
  logSuccess(console.log, `${name}/src/app/shared created`);
}

export async function runNewCommand(args: NewArgs): Promise<void> {
  const name = args.name;
  const verbose = args.verbose ?? false;
  const silent = args.silent ?? false;

  if (!name) {
    throw new Error('Please provide a project name (e.g. "kl new example") or use --name/-n');
  }

  const pmName = args.pm ?? (silent ? 'bun' : await askPackageManager());
  const pm = getPmCommands(pmName);

  logHeader(console.log, 'KOALA UI PROJECT SETUP', `Project: ${name}`);

  await createAngularProject(name, pmName, pm, verbose);
  logSuccess(console.log, 'Angular project created');

  createFolderStructure(name);
  logSuccess(console.log, 'Koala structure applied');

  await setupGlobalTests(name, verbose);
  logSuccess(console.log, 'Test stack configured');

  await runCommand(getProjectExecCommand(pmName, 'ng generate environments'), {
    cwd: name,
    verbose,
    loaderText: 'Generating environment files',
  });
  await runCommand(getProjectExecCommand(pmName, 'eslint . --fix'), {
    cwd: name,
    verbose,
    loaderText: 'Linting project',
  });
  await runCommand(getProjectExecCommand(pmName, 'prettier . --write'), {
    cwd: name,
    verbose,
    loaderText: 'Formatting project',
  });

  installUtil(name, 'control-changes');
  installUtil(name, 'form-is-valid');

  const aiContextFlag = args.aiContext ?? (silent ? 'none' : undefined);
  const aiContextTargets = await resolveAiContextTargets(aiContextFlag);
  applyAiContext(name, aiContextTargets);

  logSuccess(console.log, 'Project ready');
}
