import { AGENTS_LABEL } from '../constants/agents';
import { logSuccess, logStep, logWarning } from '../utils/cli-ui';
import { installAgents } from '../utils/install-agents';
import { getDefaultProjectName } from '../utils/project-path';

export interface AddArgs {
  feature?: string;
  targets?: string[];
  project?: string;
  verbose?: boolean;
}

export async function runAddCommand(args: AddArgs): Promise<void> {
  const logger = console.log;
  const projectName = args.project || getDefaultProjectName();
  const feature = args.feature?.trim().toLowerCase();

  if (!feature || feature === 'help') {
    throw new Error(
      'USAGE\n  $ kl add agents [-p <project>]\n\nFEATURES\n  agents  Contexto de agentes de IA (AGENTS.md + .agents/)',
    );
  }

  if (feature !== 'agents') {
    throw new Error(`Feature desconhecida: "${feature}". Use: kl add agents`);
  }

  if (args.targets && args.targets.length > 0) {
    throw new Error(
      `Argumentos extras não suportados: ${args.targets.join(' ')}. Use: kl add agents`,
    );
  }

  logStep(logger, 'Configurando agentes de IA...');
  const result = installAgents(projectName);

  for (const legacyPath of result.removedLegacy) {
    logWarning(logger, `Removido legado: ${legacyPath}`);
  }

  logSuccess(logger, result.label || AGENTS_LABEL);
  logSuccess(logger, 'Agentes de IA atualizados');
}
