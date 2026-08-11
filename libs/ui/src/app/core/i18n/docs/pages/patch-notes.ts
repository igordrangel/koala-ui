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
          'A versão publicada do pacote @koalarx/ui aparece no package.json do repositório. O arquivo CHANGELOG.md na raiz espelha estas notas. A partir de 23.x, o major da lib = major do Angular + 1 (23 → Angular 22). Para Angular 21 use a linha 22.x; para Angular 22 use 23.x.',
      },
      v2303: {
        title: '23.0.3 — Sem vazamento de docs na CLI',
        description:
          'Templates e resources instaláveis deixam de levar artefatos só da app de documentação.',
        items: [
          'kl new usa index.html de consumidor (sem script de versão/locale das docs).',
          'kl install auth não depende mais de LocaleService / i18n das docs.',
        ],
        upgrade:
          'Em projetos já gerados: remova o <script> de migração de hash/versão do src/index.html. Se usa auth, reinstale com kl install auth (ou remova imports de ../i18n/locale.service nos arquivos de core copiados).',
      },
      v2302: {
        title: '23.0.2 — ListBase com service + getMany',
        description:
          'ListBase passa a carregar listas via service HttpBase com getMany; install puxa deps novas.',
        items: [
          'datalist embutido chama service.getMany e sincroniza totalItems com count.',
          '2º genérico é TListService; constructor recebe Type<TListService> (super(MyService)).',
          'kl install list-base também instala http (HttpBase), is-mobile e from-observable-with-signal.',
        ],
        upgrade:
          'Service deve estender HttpBase e implementar getMany. Troque ListBase<T, TFilter> por ListBase<T, MyService>, chame super(MyService), remova override datalist se usar o loader padrão, e reinstale com kl install list-base.',
      },
      v2301: {
        title: '23.0.1 — CLI --silent',
        description: 'Modo não interativo na CLI para agentes de IA e CI.',
        items: [
          'Flag --silent no kl new, kl init e kl install: aceita libs externas e pula prompts (no new/init defaults bun + AI context none).',
        ],
        upgrade:
          'Em agentes de IA ou CI, prefira kl install … --silent e kl new … --silent. Em uso interativo, o comportamento sem a flag permanece igual.',
      },
      v2300: {
        title: '23.0.0 — Angular 22 + Signal Forms',
        description:
          'Upgrade para Angular 22, controles de formulário com FormValueControl/FormCheckboxControl e correção da política de versionamento.',
        items: [
          'Docs app e pins da CLI em Angular 22 / TypeScript 6.',
          'Controles de formulário migrados de ControlValueAccessor para FormValueControl / FormCheckboxControl (Signal Forms; Reactive Forms e ngModel continuam compatíveis no Angular 22).',
          'inline-filter migrado para Signal Forms; validators no builder agora usam FieldValidator (({ value }) => …), não ValidatorFn.',
          'Removidos utils control-changes, form-is-valid e get-value-on-first-change (ponte Reactive Forms); CLI não os instala mais no scaffold nem como dep de componentes.',
          'Interceptors HTTP funcionais (withInterceptors); remoção de NgZone em mask/currency.',
          'Política de versão: 22.x = Angular 21; 23.x = Angular 22.',
        ],
        upgrade:
          'Atualize o projeto consumidor para Angular 22. Reinstale componentes de formulário (e inline-filter) com kl install quando quiser o novo código FormValueControl/Signal Forms. Se passar validators no InlineFilterBuilder, troque ValidatorFn por FieldValidator de Signal Forms. Apague control-changes.ts / form-is-valid.ts / get-value-on-first-change.ts se existirem e troque usos por field().value() / field().valid(). Para Angular 21, use a linha 22.x (dist-tag angular-21 após o release).',
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
          'The published @koalarx/ui package version is in the repository package.json. The root CHANGELOG.md mirrors these notes. From 23.x onward, library major = Angular major + 1 (23 → Angular 22). For Angular 21 use the 22.x line; for Angular 22 use 23.x.',
      },
      v2303: {
        title: '23.0.3 — No docs leakage in the CLI',
        description:
          'Installable templates and resources no longer ship documentation-app-only artifacts.',
        items: [
          'kl new uses a consumer index.html (no docs version/locale migration script).',
          'kl install auth no longer depends on LocaleService / docs i18n.',
        ],
        upgrade:
          'On existing projects: remove the hash/version migration <script> from src/index.html. If you use auth, reinstall with kl install auth (or drop ../i18n/locale.service imports from the copied core files).',
      },
      v2302: {
        title: '23.0.2 — ListBase with service + getMany',
        description:
          'ListBase now loads lists through an HttpBase service with getMany; install pulls new deps.',
        items: [
          'Built-in datalist calls service.getMany and syncs totalItems from count.',
          'Second generic is TListService; constructor takes Type<TListService> (super(MyService)).',
          'kl install list-base also installs http (HttpBase), is-mobile, and from-observable-with-signal.',
        ],
        upgrade:
          'Service must extend HttpBase and implement getMany. Replace ListBase<T, TFilter> with ListBase<T, MyService>, call super(MyService), remove override datalist if using the default loader, and reinstall with kl install list-base.',
      },
      v2301: {
        title: '23.0.1 — CLI --silent',
        description: 'Non-interactive CLI mode for AI agents and CI.',
        items: [
          '--silent flag on kl new, kl init, and kl install: accepts external libs and skips prompts (on new/init defaults to bun + AI context none).',
        ],
        upgrade:
          'For AI agents or CI, prefer kl install … --silent and kl new … --silent. Interactive use without the flag is unchanged.',
      },
      v2300: {
        title: '23.0.0 — Angular 22 + Signal Forms',
        description:
          'Upgrade to Angular 22, form controls via FormValueControl/FormCheckboxControl, and corrected versioning policy.',
        items: [
          'Docs app and CLI pins on Angular 22 / TypeScript 6.',
          'Form controls migrated from ControlValueAccessor to FormValueControl / FormCheckboxControl (Signal Forms; Reactive Forms and ngModel remain compatible on Angular 22).',
          'inline-filter migrated to Signal Forms; builder validators now use FieldValidator (({ value }) => …), not ValidatorFn.',
          'Removed control-changes, form-is-valid, and get-value-on-first-change utils (Reactive Forms bridges); CLI no longer scaffolds or installs them as component deps.',
          'Functional HTTP interceptors (withInterceptors); NgZone removed from mask/currency.',
          'Versioning policy: 22.x = Angular 21; 23.x = Angular 22.',
        ],
        upgrade:
          'Upgrade consumer apps to Angular 22. Re-run kl install for form components (and inline-filter) to pick up FormValueControl/Signal Forms. If you pass validators to InlineFilterBuilder, replace ValidatorFn with Signal Forms FieldValidator. Delete control-changes.ts / form-is-valid.ts / get-value-on-first-change.ts if present and replace usages with field().value() / field().valid(). For Angular 21, stay on the 22.x line (angular-21 dist-tag after release).',
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
