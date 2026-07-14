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
          'A versão publicada do pacote @koalarx/ui aparece no package.json do repositório. O arquivo CHANGELOG.md na raiz espelha estas notas. A partir de 22.4.0, o major da lib acompanha o major do Angular (21.x → Angular 21, 22.4+ → Angular 22). As releases 22.0–22.3 foram publicadas ainda com Angular 21.',
      },
      v2240: {
        title: '22.4.0 — Angular 22 + Signal Forms',
        description:
          'Upgrade para Angular 22, controles de formulário com FormValueControl/FormCheckboxControl e realinhamento de versionamento.',
        items: [
          'Docs app e pins da CLI em Angular 22 / TypeScript 6.',
          'Controles de formulário migrados de ControlValueAccessor para FormValueControl / FormCheckboxControl (Signal Forms; Reactive Forms e ngModel continuam compatíveis no Angular 22).',
          'Interceptors HTTP funcionais (withInterceptors); remoção de NgZone em mask/currency.',
          'Política de versão: 21.x = Angular 21; 22.4+ = Angular 22. Preferir 21.2.x em vez de 22.0–22.3 para Angular 21.',
        ],
        upgrade:
          'Atualize o projeto consumidor para Angular 22. Reinstale componentes de formulário com kl install quando quiser o novo código FormValueControl. Para Angular 21, use a linha 21.x (dist-tag angular-21 após o release).',
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
          'The published @koalarx/ui package version is in the repository package.json. The root CHANGELOG.md mirrors these notes. From 22.4.0 onward, the library major matches the Angular major (21.x → Angular 21, 22.4+ → Angular 22). Releases 22.0–22.3 were published while still on Angular 21.',
      },
      v2240: {
        title: '22.4.0 — Angular 22 + Signal Forms',
        description:
          'Upgrade to Angular 22, form controls via FormValueControl/FormCheckboxControl, and version alignment.',
        items: [
          'Docs app and CLI pins on Angular 22 / TypeScript 6.',
          'Form controls migrated from ControlValueAccessor to FormValueControl / FormCheckboxControl (Signal Forms; Reactive Forms and ngModel remain compatible on Angular 22).',
          'Functional HTTP interceptors (withInterceptors); NgZone removed from mask/currency.',
          'Versioning policy: 21.x = Angular 21; 22.4+ = Angular 22. Prefer 21.2.x over 22.0–22.3 for Angular 21.',
        ],
        upgrade:
          'Upgrade consumer apps to Angular 22. Re-run kl install for form components to pick up FormValueControl. For Angular 21, stay on the 21.x line (angular-21 dist-tag after release).',
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
