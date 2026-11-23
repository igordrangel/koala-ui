import { AGENTS_LABEL } from '../constants/agents';
import { logSuccess, logStep, logWarning } from './cli-ui';
import { installAgents } from './install-agents';
import { promptAgents } from './prompt-agents';

/**
 * Resolve se agents devem ser instalados.
 * `flag` definido ⇒ usa o valor; senão pergunta interativamente.
 */
export async function resolveAgentsEnabled(flag?: boolean): Promise<boolean> {
  if (flag !== undefined) {
    return flag;
  }

  return promptAgents();
}

export function applyAgents(
  projectName: string,
  enabled: boolean,
  logger: typeof console.log = console.log,
): void {
  if (!enabled) {
    logStep(logger, 'Agentes de IA: não configurados');
    return;
  }

  logStep(logger, `Configurando agentes de IA (${AGENTS_LABEL})...`);
  const result = installAgents(projectName);

  for (const legacyPath of result.removedLegacy) {
    logWarning(logger, `Removido legado: ${legacyPath}`);
  }

  logSuccess(logger, result.label);
}
