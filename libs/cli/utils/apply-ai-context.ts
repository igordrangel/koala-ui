import {
  formatAiContextTargets,
  parseAiContextFlag,
  type AiContextTarget,
} from '../constants/ai-context';
import { logSuccess, logStep, logWarning } from './cli-ui';
import { installAiContext } from './install-ai-context';
import { promptAiContext } from './prompt-ai-context';

export async function resolveAiContextTargets(
  aiContextFlag?: string,
): Promise<AiContextTarget[]> {
  if (aiContextFlag !== undefined) {
    return parseAiContextFlag(aiContextFlag);
  }

  return promptAiContext();
}

export function applyAiContext(
  projectName: string,
  targets: readonly AiContextTarget[],
  logger: typeof console.log = console.log,
): void {
  if (targets.length === 0) {
    logStep(logger, `Contexto AI: ${formatAiContextTargets(targets)}`);
    return;
  }

  logStep(logger, `Configurando contexto AI (${formatAiContextTargets(targets)})...`);
  const results = installAiContext(projectName, targets);

  for (const result of results) {
    if (result.installed) {
      logSuccess(logger, result.label);
    } else if (result.reason) {
      logWarning(logger, `${result.label}: ${result.reason}`);
    }
  }
}
