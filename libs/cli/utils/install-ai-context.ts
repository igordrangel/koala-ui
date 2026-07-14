import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import {
  AI_CONTEXT_AGENTS_PATH,
  AI_CONTEXT_CURSOR_RULE_PATHS,
  AI_CONTEXT_GITHUB_PATH,
  AI_CONTEXT_LABELS,
  AiContextTarget,
  type AiContextTarget as AiContextTargetType,
} from '../constants/ai-context';
import { getAiContextAssetsPath } from './get-ai-context-assets-path';
import { getProjectPath } from './project-path';

export type InstallAiContextResult = {
  label: string;
  installed: boolean;
  reason?: string;
};

function copyIfMissing(sourcePath: string, targetPath: string, force = false): boolean {
  if (!force && existsSync(targetPath)) {
    return false;
  }

  mkdirSync(path.dirname(targetPath), { recursive: true });
  cpSync(sourcePath, targetPath, { force: true });
  return true;
}

function installAgentsFile(projectRoot: string, assetsRoot: string): boolean {
  return copyIfMissing(
    path.join(assetsRoot, AI_CONTEXT_AGENTS_PATH),
    path.join(projectRoot, AI_CONTEXT_AGENTS_PATH),
  );
}

function installCursorRules(
  projectRoot: string,
  assetsRoot: string,
): { installed: boolean; skipped: boolean } {
  let copied = 0;
  let skipped = 0;

  for (const relativePath of AI_CONTEXT_CURSOR_RULE_PATHS) {
    const didCopy = copyIfMissing(
      path.join(assetsRoot, relativePath),
      path.join(projectRoot, relativePath),
    );

    if (didCopy) {
      copied += 1;
    } else {
      skipped += 1;
    }
  }

  return {
    installed: copied > 0,
    skipped: skipped === AI_CONTEXT_CURSOR_RULE_PATHS.length,
  };
}

function installGithubInstructions(projectRoot: string, assetsRoot: string): boolean {
  return copyIfMissing(
    path.join(assetsRoot, AI_CONTEXT_GITHUB_PATH),
    path.join(projectRoot, AI_CONTEXT_GITHUB_PATH),
  );
}

/**
 * Copia contexto AI para o projeto.
 * Não sobrescreve arquivos já existentes (idempotente / preserva customizações).
 */
export function installAiContext(
  projectName: string,
  targets: readonly AiContextTargetType[],
): InstallAiContextResult[] {
  if (targets.length === 0) {
    return [];
  }

  const projectRoot = getProjectPath(projectName);
  const assetsRoot = getAiContextAssetsPath();
  const uniqueTargets = Array.from(new Set(targets));
  const results: InstallAiContextResult[] = [];

  installAgentsFile(projectRoot, assetsRoot);

  for (const target of uniqueTargets) {
    if (target === AiContextTarget.CURSOR) {
      const cursorResult = installCursorRules(projectRoot, assetsRoot);

      results.push({
        label: AI_CONTEXT_LABELS[AiContextTarget.CURSOR],
        installed: cursorResult.installed,
        reason: cursorResult.skipped ? 'Regras Cursor já estão instaladas.' : undefined,
      });
      continue;
    }

    const installed = installGithubInstructions(projectRoot, assetsRoot);

    results.push({
      label: AI_CONTEXT_LABELS[AiContextTarget.GITHUB],
      installed,
      reason: installed ? undefined : 'Instruções do GitHub Copilot já estão instaladas.',
    });
  }

  return results;
}
