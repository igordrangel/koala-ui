import chalk from 'chalk';
import prompts from 'prompts';
import { detectPackageManager, getPmCommands } from './package-manager';
import { getProjectPath } from './project-path';
import { runCommand } from './run-command';

export async function installLib(
  projectName: string,
  lib: string,
  verbose = false,
): Promise<boolean> {
  const response = await prompts(
    {
      type: 'toggle',
      name: 'confirm',
      message: `${chalk.cyan('KoalaUI')} Install dependency ${chalk.yellow(lib)} now?`,
      hint: 'Required by selected component',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      onCancel: () => {
        throw new Error('KoalaUI: dependency installation prompt was cancelled.');
      },
    },
  );

  if (!response.confirm) {
    return false;
  }

  const pm = detectPackageManager(projectName);
  const pmCmd = getPmCommands(pm);

  await runCommand(`${pmCmd.add} ${lib}`, {
    cwd: getProjectPath(projectName),
    loaderText: `Installing ${lib}`,
    verbose,
  });

  return true;
}
