/** Paths written by `kl add agents` / `kl new|init --agents`. */
export const AGENTS_FILE = 'AGENTS.md';

export const AGENTS_INSTRUCTION_PATHS = [
  '.agents/instructions/structure.md',
  '.agents/instructions/components.md',
  '.agents/instructions/angular.md',
  '.agents/instructions/docs.md',
] as const;

export const AGENTS_SKILL_PATHS = ['.agents/skills/code-review.md'] as const;

export const AGENTS_PACK_PATHS = [
  AGENTS_FILE,
  ...AGENTS_INSTRUCTION_PATHS,
  ...AGENTS_SKILL_PATHS,
] as const;

/** Legacy Cursor / Copilot scaffolding removed by `kl add agents`. */
export const LEGACY_AI_CONTEXT_PATHS = [
  '.cursor/rules/koala-structure.mdc',
  '.cursor/rules/koala-components.mdc',
  '.cursor/rules/koala-angular.mdc',
  '.cursor/rules/koala-docs.mdc',
  '.github/copilot-instructions.md',
] as const;

export const AGENTS_LABEL = 'AGENTS.md + .agents/instructions + .agents/skills';

/**
 * Resolve whether agents should be installed from CLI flags.
 * `--agents` wins over `--no-agents`. When neither is set, returns `undefined` (prompt / silent default).
 */
export function resolveAgentsFlag(options: {
  agents?: boolean;
  noAgents?: boolean;
}): boolean | undefined {
  if (options.agents) {
    return true;
  }

  if (options.noAgents) {
    return false;
  }

  return undefined;
}
