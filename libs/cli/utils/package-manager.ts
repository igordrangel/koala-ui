import { existsSync } from 'node:fs';
import chalk from 'chalk';
import prompts from 'prompts';
import { getProjectPath } from './project-path';

export type PackageManager = 'bun' | 'npm' | 'yarn' | 'pnpm';

export interface PmCommands {
  dlx: string;
  exec: string;
  run: string;
  install: string;
  installDev: string;
  add: string;
}

export function getPmCommands(pm: PackageManager): PmCommands {
  switch (pm) {
    case 'npm':
      return {
        dlx: 'npx --yes',
        exec: 'npx',
        run: 'npm run',
        install: 'npm install',
        installDev: 'npm install -D',
        add: 'npm install',
      };
    case 'yarn':
      return {
        dlx: 'yarn dlx',
        exec: 'yarn',
        run: 'yarn run',
        install: 'yarn add',
        installDev: 'yarn add -D',
        add: 'yarn add',
      };
    case 'pnpm':
      return {
        dlx: 'pnpm dlx',
        exec: 'pnpm exec',
        run: 'pnpm run',
        install: 'pnpm add',
        installDev: 'pnpm add -D',
        add: 'pnpm add',
      };
    case 'bun':
    default:
      return {
        dlx: 'bunx',
        exec: 'bunx',
        run: 'bun run',
        install: 'bun add',
        installDev: 'bun add -D',
        add: 'bun add',
      };
  }
}

export function getAngularCreateCommand(projectName: string, pm: PackageManager) {
  const commands = getPmCommands(pm);
  return `${commands.dlx} @angular/cli new ${projectName} --defaults --style=tailwind --package-manager ${pm}`;
}

export function getProjectExecCommand(pm: PackageManager, command: string) {
  const commands = getPmCommands(pm);

  switch (pm) {
    case 'yarn':
      return `yarn ${command}`;
    case 'npm':
    case 'pnpm':
    case 'bun':
    default:
      return `${commands.exec} ${command}`;
  }
}

export async function askPackageManager(): Promise<PackageManager> {
  const options: PackageManager[] = ['bun', 'npm', 'yarn', 'pnpm'];

  const response = await prompts(
    {
      type: 'select',
      name: 'pm',
      message: `${chalk.cyan('KoalaUI')} Select your package manager`,
      hint: '- Use arrow keys and Enter',
      choices: options.map((value) => ({ title: value, value })),
      initial: 0,
    },
    {
      onCancel: () => {
        throw new Error('KoalaUI: package manager selection was cancelled.');
      },
    },
  );

  return response.pm as PackageManager;
}

export function detectPackageManager(projectName: string): PackageManager {
  const projectPath = getProjectPath(projectName);
  const lockfiles: [string, PackageManager][] = [
    ['bun.lockb', 'bun'],
    ['bun.lock', 'bun'],
    ['yarn.lock', 'yarn'],
    ['pnpm-lock.yaml', 'pnpm'],
    ['package-lock.json', 'npm'],
  ];

  for (const [lockfile, pm] of lockfiles) {
    if (existsSync(`${projectPath}/${lockfile}`)) {
      return pm;
    }
  }

  return 'npm';
}
