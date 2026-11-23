import { logHeader } from '../utils/cli-ui';
import { getDefaultProjectName } from '../utils/project-path';
import { setupExistingProject } from '../utils/setup-existing-project';

export interface InitArgs {
  project?: string;
  verbose?: boolean;
  /** Explicit agents choice from `--agents` / `--no-agents`. */
  agents?: boolean;
  /** Skip interactive prompts (agents default to off unless `--agents` is set). */
  silent?: boolean;
}

export async function runInitCommand(args: InitArgs): Promise<void> {
  const logger = console.log;
  const projectName = args.project || getDefaultProjectName();
  const verbose = args.verbose ?? false;
  const silent = args.silent ?? false;
  const agents = args.agents ?? (silent ? false : undefined);

  logHeader(logger, 'KOALA PROJECT INITIALIZER', `Project: ${projectName}`);

  await setupExistingProject(projectName, verbose, agents);
}
