import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  AI_CONTEXT_CURSOR_MARKER,
  AI_CONTEXT_GITHUB_PATH,
  AI_CONTEXT_LABELS,
  AiContextTarget,
  listMissingAiContextTargets,
  parseAiContextTarget,
  type AiContextTarget as AiContextTargetType,
} from '../constants/ai-context';
import { logSuccess, logStep, logWarning } from '../utils/cli-ui';
import { installAiContext } from '../utils/install-ai-context';
import { getProjectPath } from '../utils/project-path';
import { promptAiContext } from '../utils/prompt-ai-context';

export interface AddArgs {
  feature?: string;
  targets?: string[];
  project?: string;
  verbose?: boolean;
}

function detectAiContextState(projectRoot: string): { cursor: boolean; github: boolean } {
  return {
    cursor: existsSync(path.join(projectRoot, AI_CONTEXT_CURSOR_MARKER)),
    github: existsSync(path.join(projectRoot, AI_CONTEXT_GITHUB_PATH)),
  };
}

function logInstallResults(
  results: ReturnType<typeof installAiContext>,
  logger: typeof console.log,
): void {
  for (const result of results) {
    if (result.installed) {
      logSuccess(logger, result.label);
    } else if (result.reason) {
      logWarning(logger, `${result.label}: ${result.reason}`);
    }
  }
}

export async function runAddCommand(args: AddArgs): Promise<void> {
  const logger = console.log;
  const projectName = args.project || (process.cwd().split('/').pop() as string);
  const feature = args.feature?.trim().toLowerCase();

  if (!feature || feature === 'help') {
    throw new Error(
      'USAGE\n  $ kl add ai-context cursor|github [cursor|github] [-p <project>]\n\nFEATURES\n  ai-context  Contexto AI (AGENTS.md + regras do editor)',
    );
  }

  if (feature !== 'ai-context') {
    throw new Error(
      `Feature desconhecida: "${feature}". Use: kl add ai-context cursor|github`,
    );
  }

  const projectRoot = getProjectPath(projectName);
  const state = detectAiContextState(projectRoot);
  let targets: AiContextTargetType[] = [];

  if (args.targets && args.targets.length > 0) {
    targets = args.targets.map((value) => parseAiContextTarget(value));
  } else {
    const available = listMissingAiContextTargets(state);
    if (available.length === 0) {
      logWarning(logger, 'Contexto AI (Cursor e GitHub Copilot) já está instalado.');
      return;
    }

    const prompted = await promptAiContext();
    targets = prompted.filter((target) => {
      if (target === AiContextTarget.CURSOR) {
        return !state.cursor;
      }
      return !state.github;
    });
  }

  const missing = targets.filter((target) => {
    if (target === AiContextTarget.CURSOR) {
      return !state.cursor;
    }
    return !state.github;
  });

  if (missing.length === 0) {
    logWarning(
      logger,
      `Nada a instalar. Já presente: ${targets.map((t) => AI_CONTEXT_LABELS[t]).join(', ')}`,
    );
    return;
  }

  logStep(logger, 'Configurando contexto AI...');
  const results = installAiContext(projectName, missing);
  logInstallResults(results, logger);
  logSuccess(logger, 'Contexto AI atualizado');
}
