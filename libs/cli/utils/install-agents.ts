import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import {
  AGENTS_LABEL,
  AGENTS_PACK_PATHS,
  LEGACY_AI_CONTEXT_PATHS,
} from '../constants/agents';
import { getAgentsAssetsPath } from './get-agents-assets-path';
import { getProjectPath } from './project-path';

export type InstallAgentsResult = {
  label: string;
  removedLegacy: string[];
  written: string[];
};

function copyForce(sourcePath: string, targetPath: string): void {
  mkdirSync(path.dirname(targetPath), { recursive: true });
  cpSync(sourcePath, targetPath, { force: true });
}

function removeLegacyAiContext(projectRoot: string): string[] {
  const removed: string[] = [];

  for (const relativePath of LEGACY_AI_CONTEXT_PATHS) {
    const targetPath = path.join(projectRoot, relativePath);
    if (!existsSync(targetPath)) {
      continue;
    }

    rmSync(targetPath, { force: true });
    removed.push(relativePath);
  }

  return removed;
}

/**
 * Instala o pacote IDE-agnóstico de agentes.
 * Remove scaffolding legado (Cursor rules / Copilot) e sobrescreve o pacote Koala.
 */
export function installAgents(projectName: string): InstallAgentsResult {
  const projectRoot = getProjectPath(projectName);
  const assetsRoot = getAgentsAssetsPath();
  const removedLegacy = removeLegacyAiContext(projectRoot);
  const written: string[] = [];

  for (const relativePath of AGENTS_PACK_PATHS) {
    const sourcePath = path.join(assetsRoot, relativePath);
    const targetPath = path.join(projectRoot, relativePath);

    if (!existsSync(sourcePath)) {
      throw new Error(`Asset de agentes ausente: ${relativePath}`);
    }

    copyForce(sourcePath, targetPath);
    written.push(relativePath);
  }

  return {
    label: AGENTS_LABEL,
    removedLegacy,
    written,
  };
}
