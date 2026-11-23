import path from 'node:path';
import { existsSync } from 'node:fs';
import { getPackageRoot } from './get-package-root';

/** Pasta com AGENTS.md e `.agents/` para projetos gerados. */
export function getAgentsAssetsPath(): string {
  const root = getPackageRoot();
  const publishedAssets = path.join(root, 'cli', 'assets', 'agents');

  if (existsSync(publishedAssets)) {
    return publishedAssets;
  }

  const monorepoAssets = path.join(root, 'libs', 'cli', 'assets', 'agents');

  if (existsSync(monorepoAssets)) {
    return monorepoAssets;
  }

  throw new Error('Assets de agentes não encontrados (cli/assets/agents).');
}
