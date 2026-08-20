import { existsSync } from 'node:fs';
import path from 'node:path';
import { getPackageRoot } from './get-package-root';

/** Pasta com AGENTS.md, .cursor/rules e .github para projetos gerados. */
export function getAiContextAssetsPath(): string {
  const root = getPackageRoot(import.meta.url);
  const publishedAssets = path.join(root, 'cli', 'assets', 'ai-context');

  if (existsSync(publishedAssets)) {
    return publishedAssets;
  }

  const monorepoAssets = path.join(root, 'libs', 'cli', 'assets', 'ai-context');

  if (existsSync(monorepoAssets)) {
    return monorepoAssets;
  }

  throw new Error('Assets de contexto AI não encontrados (cli/assets/ai-context).');
}
