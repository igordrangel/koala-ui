import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { getProjectPath } from './project-path';

const PR_WORKFLOW_CONTENT = `name: PR TESTS

on:
  pull_request:
    branches: [main]

jobs:
  tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Install Playwright Chromium
        run: bunx playwright install --with-deps chromium

      - name: Run unit tests
        run: bun run test:unit

      - name: Run e2e tests
        run: bun run e2e
`;

export function setupGithubWorkflowTests(projectName: string) {
  const projectPath = getProjectPath(projectName);
  const workflowsPath = `${projectPath}/.github/workflows`;
  const prWorkflowPath = `${workflowsPath}/pr-tests.yml`;

  if (existsSync(prWorkflowPath)) {
    return;
  }

  mkdirSync(workflowsPath, { recursive: true });
  writeFileSync(prWorkflowPath, PR_WORKFLOW_CONTENT);
}
