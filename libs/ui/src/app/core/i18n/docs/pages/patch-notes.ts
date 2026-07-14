import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const PATCH_NOTES_PAGE = {
  pt: {
    title: 'Patch notes',
    description:
      'Changelog voltado a quem usa ou atualiza projetos com a CLI do Koala UI. Detalhes de cada componente ficam nas páginas de documentação referenciadas.',
    sections: {
      overview: {
        title: 'Como usar estas notas',
        description:
          'A versão publicada do pacote @koalarx/ui aparece no package.json do repositório. O arquivo CHANGELOG.md na raiz espelha estas notas.',
      },
      v2230: {
        title: '22.3.0 — Contexto AI',
        description: 'Scaffolding de contexto para Cursor e GitHub Copilot nos projetos gerados.',
        items: [
          'Prompt de contexto AI no kl new e kl init (Cursor, GitHub Copilot, ambos ou nenhum).',
          'Flag --ai-context none|cursor|github|both para pular o prompt interativo.',
          'Novo comando kl add ai-context cursor|github — gera AGENTS.md e regras Cursor / instruções Copilot. Não sobrescreve arquivos já existentes.',
          'Assets em libs/cli/assets/ai-context/ focados em docs-first, kl install e Angular (Signals/standalone).',
          'Documentação de patch notes no site e CHANGELOG.md na raiz.',
        ],
        upgrade:
          'Em projetos existentes: kl add ai-context cursor, github, ou ambos. Em projetos novos, escolha no prompt ou use --ai-context.',
      },
    },
  },
  en: {
    title: 'Patch notes',
    description:
      'Changelog for anyone using or upgrading projects scaffolded with the Koala UI CLI. Component details live on the linked documentation pages.',
    sections: {
      overview: {
        title: 'How to use these notes',
        description:
          'The published @koalarx/ui package version is in the repository package.json. The root CHANGELOG.md mirrors these notes.',
      },
      v2230: {
        title: '22.3.0 — AI context',
        description: 'AI context scaffolding for Cursor and GitHub Copilot in generated projects.',
        items: [
          'AI context prompt in kl new and kl init (Cursor, GitHub Copilot, both, or none).',
          '--ai-context none|cursor|github|both flag to skip the interactive prompt.',
          'New command kl add ai-context cursor|github — scaffolds AGENTS.md plus Cursor rules / Copilot instructions. Does not overwrite existing files.',
          'Assets under libs/cli/assets/ai-context/ focused on docs-first, kl install, and Angular (Signals/standalone).',
          'Patch notes documentation on the site and CHANGELOG.md at the repo root.',
        ],
        upgrade:
          'On existing projects: kl add ai-context cursor, github, or both. On new projects, choose in the prompt or use --ai-context.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type PatchNotesPageCopy = (typeof PATCH_NOTES_PAGE)[Locale];
