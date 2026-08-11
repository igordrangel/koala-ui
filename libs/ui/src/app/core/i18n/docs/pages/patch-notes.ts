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
      v2233: {
        title: '22.3.3 — Sem vazamento de docs na CLI',
        description:
          'Templates e resources instaláveis deixam de levar artefatos só da app de documentação.',
        items: [
          'kl new usa index.html de consumidor (sem script de versão/locale das docs).',
          'kl install auth não depende mais de LocaleService / i18n das docs.',
        ],
        upgrade:
          'Em projetos já gerados: remova o <script> de migração de hash/versão do src/index.html. Se usa auth, reinstale com kl install auth (ou remova imports de ../i18n/locale.service nos arquivos de core copiados).',
      },
      v2231: {
        title: '22.3.1 — CLI --silent',
        description: 'Modo não interativo na CLI para agentes de IA e CI.',
        items: [
          'Flag --silent no kl new, kl init e kl install: aceita libs externas e pula prompts (no new/init defaults bun + AI context none).',
        ],
        upgrade:
          'Em agentes de IA ou CI, prefira kl install … --silent e kl new … --silent. Em uso interativo, o comportamento sem a flag permanece igual.',
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
      v2233: {
        title: '22.3.3 — No docs leakage in the CLI',
        description:
          'Installable templates and resources no longer ship documentation-app-only artifacts.',
        items: [
          'kl new uses a consumer index.html (no docs version/locale migration script).',
          'kl install auth no longer depends on LocaleService / docs i18n.',
        ],
        upgrade:
          'On existing projects: remove the hash/version migration <script> from src/index.html. If you use auth, reinstall with kl install auth (or drop ../i18n/locale.service imports from the copied core files).',
      },
      v2231: {
        title: '22.3.1 — CLI --silent',
        description: 'Non-interactive CLI mode for AI agents and CI.',
        items: [
          '--silent flag on kl new, kl init, and kl install: accepts external libs and skips prompts (on new/init defaults to bun + AI context none).',
        ],
        upgrade:
          'For AI agents or CI, prefer kl install … --silent and kl new … --silent. Interactive use without the flag is unchanged.',
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
