import { setupGithubWorkflowTests } from './setup-github-workflow-tests';
import { setupPlaywright } from './setup-playwright';
import { setupUnitTests } from './setup-unit-tests';

export async function setupGlobalTests(projectName: string, verbose = false) {
  await setupPlaywright(projectName, verbose);
  await setupUnitTests(projectName, verbose);
  setupGithubWorkflowTests(projectName);
}
