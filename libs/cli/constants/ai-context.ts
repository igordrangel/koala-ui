/** Alvos de scaffolding de contexto AI (Cursor / GitHub Copilot). */
export const AiContextTarget = {
  CURSOR: 'cursor',
  GITHUB: 'github',
} as const;

export type AiContextTarget = (typeof AiContextTarget)[keyof typeof AiContextTarget];

/** Escolha do prompt interativo no `new` / `init` / `add`. */
export const AiContextPromptChoice = {
  NONE: 'none',
  CURSOR: AiContextTarget.CURSOR,
  GITHUB: AiContextTarget.GITHUB,
  BOTH: 'both',
} as const;

export type AiContextPromptChoice =
  (typeof AiContextPromptChoice)[keyof typeof AiContextPromptChoice];

export const AI_CONTEXT_TARGETS: readonly AiContextTarget[] = [
  AiContextTarget.CURSOR,
  AiContextTarget.GITHUB,
];

export const AI_CONTEXT_ALIASES: Record<string, AiContextTarget> = {
  cursor: AiContextTarget.CURSOR,
  github: AiContextTarget.GITHUB,
  copilot: AiContextTarget.GITHUB,
  'github-copilot': AiContextTarget.GITHUB,
};

export const AI_CONTEXT_LABELS: Record<AiContextTarget, string> = {
  [AiContextTarget.CURSOR]: 'Cursor (.cursor/rules + AGENTS.md)',
  [AiContextTarget.GITHUB]: 'GitHub Copilot (.github/copilot-instructions.md + AGENTS.md)',
};

export const AI_CONTEXT_PROMPT_LABELS: Record<AiContextPromptChoice, string> = {
  [AiContextPromptChoice.NONE]: 'Não configurar',
  [AiContextPromptChoice.CURSOR]: 'Cursor',
  [AiContextPromptChoice.GITHUB]: 'GitHub Copilot',
  [AiContextPromptChoice.BOTH]: 'Ambos (Cursor + GitHub Copilot)',
};

/** Arquivo marcador de regras Cursor geradas pela CLI. */
export const AI_CONTEXT_CURSOR_MARKER = '.cursor/rules/koala-structure.mdc';

export const AI_CONTEXT_GITHUB_PATH = '.github/copilot-instructions.md';

export const AI_CONTEXT_AGENTS_PATH = 'AGENTS.md';

export const AI_CONTEXT_CURSOR_RULE_PATHS = [
  '.cursor/rules/koala-structure.mdc',
  '.cursor/rules/koala-components.mdc',
  '.cursor/rules/koala-angular.mdc',
  '.cursor/rules/koala-docs.mdc',
] as const;

export function isAiContextTarget(value: string): value is AiContextTarget {
  return value === AiContextTarget.CURSOR || value === AiContextTarget.GITHUB;
}

export function parseAiContextTarget(value: string): AiContextTarget {
  const target = AI_CONTEXT_ALIASES[value.trim().toLowerCase()];

  if (!target) {
    throw new Error(`Alvo de contexto AI desconhecido: "${value}". Use: cursor, github.`);
  }

  return target;
}

export function parseAiContextFlag(value: string): AiContextTarget[] {
  const normalized = value.trim().toLowerCase();

  if (normalized === AiContextPromptChoice.NONE) {
    return [];
  }

  if (normalized === AiContextPromptChoice.BOTH) {
    return [...AI_CONTEXT_TARGETS];
  }

  return [parseAiContextTarget(normalized)];
}

export function resolveAiContextTargetsFromPrompt(
  choice: AiContextPromptChoice,
): AiContextTarget[] {
  switch (choice) {
    case AiContextPromptChoice.NONE:
      return [];
    case AiContextPromptChoice.CURSOR:
      return [AiContextTarget.CURSOR];
    case AiContextPromptChoice.GITHUB:
      return [AiContextTarget.GITHUB];
    case AiContextPromptChoice.BOTH:
      return [...AI_CONTEXT_TARGETS];
  }
}

export function formatAiContextTargets(targets: readonly AiContextTarget[]): string {
  if (targets.length === 0) {
    return AiContextPromptChoice.NONE;
  }

  return targets.map((target) => AI_CONTEXT_LABELS[target]).join(' + ');
}

export function listMissingAiContextTargets(state: {
  cursor: boolean;
  github: boolean;
}): AiContextTarget[] {
  const missing: AiContextTarget[] = [];

  if (!state.cursor) {
    missing.push(AiContextTarget.CURSOR);
  }

  if (!state.github) {
    missing.push(AiContextTarget.GITHUB);
  }

  return missing;
}
