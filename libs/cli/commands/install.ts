import { logHeader, logInstallSummary, logSuccess, logWarning } from '../utils/cli-ui';
import { install } from '../utils/install';
import { InstallComponentFlags, InstallComponentFlagsList } from '../utils/install-component';
import { detectPackageManager, getProjectExecCommand } from '../utils/package-manager';
import { getProjectPath } from '../utils/project-path';
import { runCommand } from '../utils/run-command';

export interface InstallArgs {
  name: string;
  project?: string;
  verbose?: boolean;
}

export async function runInstallCommand(args: InstallArgs): Promise<void> {
  const logger = console.log;
  const projectName = args.project || (process.cwd().split('/').pop() as string);
  const verbose = args.verbose ?? false;

  if (!args.name) {
    throw new Error('Please provide components (e.g. "kl install button") or use --name/-n');
  }

  const flagOptions = args.name.split(',').map((name) => name.trim()) as InstallComponentFlags[];
  const validFlagOptions = InstallComponentFlagsList;

  if (flagOptions.some((option) => !validFlagOptions.includes(option))) {
    throw new Error(`Invalid component name(s). Valid options are: ${validFlagOptions.join(', ')}`);
  }

  logHeader(
    logger,
    'KOALA COMPONENT INSTALLER',
    `Project: ${projectName} | Components: ${flagOptions.join(', ')}`,
  );

  for (const componentName of flagOptions) {
    const result = await install(projectName, componentName, verbose);

    if (result.missingLibs.length > 0) {
      logWarning(
        logger,
        `Missing external libs (${componentName}): ${result.missingLibs.join(', ')}`,
      );
    }

    logInstallSummary(logger, componentName, result);

    logSuccess(logger, `${componentName} installed`);
  }

  const pm = detectPackageManager(projectName);

  await runCommand(getProjectExecCommand(pm, 'eslint . --fix'), {
    cwd: getProjectPath(projectName),
    verbose,
    loaderText: 'Linting project',
  });
  await runCommand(getProjectExecCommand(pm, 'prettier --write .'), {
    cwd: getProjectPath(projectName),
    verbose,
    loaderText: 'Formatting project',
  });
}
