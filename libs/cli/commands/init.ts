import { logHeader } from '../utils/cli-ui';
import { setupExistingProject } from '../utils/setup-existing-project';

export interface InitArgs {
  project?: string;
  verbose?: boolean;
}

export async function runInitCommand(args: InitArgs): Promise<void> {
  const logger = console.log;
  const projectName = args.project || (process.cwd().split('/').pop() as string);
  const verbose = args.verbose ?? false;

  logHeader(logger, 'KOALA PROJECT INITIALIZER', `Project: ${projectName}`);

  await setupExistingProject(projectName, verbose);
}
