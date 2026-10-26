import { logHeader } from '../utils/cli-ui';
import { getDefaultProjectName } from '../utils/project-path';
import { setupExistingProject } from '../utils/setup-existing-project';

export interface InitArgs {
  project?: string;
  verbose?: boolean;
  aiContext?: string;
  /** Skip interactive prompts (AI context defaults to none unless --ai-context is set). */
  silent?: boolean;
}

export async function runInitCommand(args: InitArgs): Promise<void> {
  const logger = console.log;
  const projectName = args.project || getDefaultProjectName();
  const verbose = args.verbose ?? false;
  const silent = args.silent ?? false;
  const aiContext = args.aiContext ?? (silent ? 'none' : undefined);

  logHeader(logger, 'KOALA PROJECT INITIALIZER', `Project: ${projectName}`);

  await setupExistingProject(projectName, verbose, aiContext);
}
