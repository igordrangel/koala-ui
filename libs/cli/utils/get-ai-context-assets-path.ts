import { existsSync } from 'node:fs';
import path from 'node:path';

/** Pasta com AGENTS.md, .cursor/rules e .github para projetos gerados. */
export function getAiContextAssetsPath(): string {
  const publishedAssets = path.join(__dirname, '..', 'assets', 'ai-context');

  if (existsSync(publishedAssets)) {
    return publishedAssets;
  }

  throw new Error('Assets de contexto AI não encontrados (cli/assets/ai-context).');
}
