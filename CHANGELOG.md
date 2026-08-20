# Changelog

Todas as mudanças notáveis deste projeto são documentadas neste arquivo e na documentação web:

- [Patch notes](https://ui.koalarx.com/#/getting-started/patch-notes) (site)
- AI: [patch-notes.md](https://ui.koalarx.com/docs/patch-notes.md)

O conteúdo principal da página web vive em `libs/ui/src/app/core/i18n/docs/pages/patch-notes.ts`. Mantenha este arquivo e o `CHANGELOG.md` alinhados ao publicar versões.

Formato inspirado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## Política de versão

A partir de **23.x**, o major de `@koalarx/ui` = major do Angular + 1 (`23` → Angular 22). A linha `22.x` permanece para Angular 21 (`previous-release` / dist-tag `angular-21`).

## [23.1.1] — Docs: patch notes e generate-icons

### Fixed

- Página Patch notes no site passa a listar todas as seções de `patch-notes.ts` (incluindo 23.1.0).
- `docs/patch-notes.md` / `generate:llms` incluem 23.1.0+.
- Sitemap inclui `icons/generate-icons`; links públicos usam `/pt/...` em vez de hash.
- Generate Icons no header **Ícones** (fora de Resources).

### Upgrade

Só redeploy das docs; sem mudanças nos projetos consumidores.

## [23.1.0] — CLI app/library/SSR, Signal Forms, pagination

### Added

- `kl new`: prompts app vs library e SSR; flags `--type`, `--ssr` / `--no-ssr`; AI context perguntado antes do scaffold.
- Docs do `generate-icons` nativo (Resources).
- Build da CLI no formato koala-nest (`Bun.Transpiler`, `bin` → `./cli/index.js`).

### Changed

- Serviços root: `@Injectable({ providedIn: 'root' })` → `@Service()`.
- Pagination: default limit `30`; query param canônico `limit` (lê `pageSize` legado).
- Inline-filter desktop em Signal Forms.

### Fixed

- Currency mask (evento `input` + sync value→DOM).
- Pagination: página ativa com `btn-primary`.
- Mobile-picker: filtros da URL no init do model.
- Seletor de versão das docs (labels estáveis; sync `DOCS_VERSIONS` na linha 22).

### Upgrade

1. Reinstale `currency` e `inline-filter` se já tiver cópias antigas.
2. Pagination grava `limit` na URL (`pageSize` ainda é lido).
3. CI/agentes: `kl new <name> --silent [--type app|library] [--ssr|--no-ssr]`.

## [23.0.3] — Sem vazamento de docs na CLI

### Fixed

- `kl new` deixa de copiar o `index.html` das docs (script de migração hash/locale e redirect `/v{n}/` → `ui.koalarx.com`).
- `kl install auth` deixa de depender de `LocaleService` / i18n das docs (que não eram publicados no pacote).

### Upgrade

1. Em projetos já gerados: remova o `<script>` de migração de hash/versão do `src/index.html`.
2. Se usa `auth`: `kl install auth` (ou remova imports de `../i18n/locale.service` nos arquivos de core copiados).

## [23.0.2] — ListBase com service + `getMany`

### Changed

- `ListBase` deixa de exigir `override datalist`: o resource embutido chama `service.getMany` e sincroniza `totalItems` com `count`.
- 2º genérico passa a ser o tipo do service (`TListService`); o constructor recebe `Type<TListService>`.
- `kl install list-base` agora instala também `http` (HttpBase), `is-mobile` e `from-observable-with-signal`.

### Upgrade

1. Service deve estender `HttpBase` e implementar `getMany(...): Observable<DatalistResponse<T>>`.
2. Troque `extends ListBase<T, TFilter>` por `extends ListBase<T, MyService>`.
3. `constructor() { super(); }` → `constructor() { super(MyService); }`.
4. Remova `override datalist` se for usar o loader padrão.
5. Reinstale: `kl install list-base` (ou `kl install list-base --silent`).

## [23.0.1] — CLI `--silent`

### Added

- Flag `--silent` em `kl new`, `kl init` e `kl install` para modo não interativo (aceita libs externas sem prompt; no `new`/`init` defaults `bun` + AI context `none`).

## [23.0.0] — Angular 22 + Signal Forms

### Changed

- Upgrade da docs app e pins da CLI para **Angular 22** / TypeScript 6.
- Controles de formulário migrados de `ControlValueAccessor` para `FormValueControl` / `FormCheckboxControl` (Signal Forms + compat Reactive/Template).
- `inline-filter` migrado para Signal Forms; validators no builder usam `FieldValidator` (`({ value }) => …`), não `ValidatorFn`.
- Removidos utils `control-changes`, `form-is-valid` e `get-value-on-first-change`; CLI não os instala mais.
- Interceptors HTTP funcionais; remoção de padrões zoneless legados (`NgZone` em mask/currency).
- Política de versão: `22.x` = Angular 21; `23.x` = Angular 22.

### Release (npm)

Após publicar `23.0.0`:

```bash
npm dist-tag add @koalarx/ui@23.0.0 latest
npm dist-tag add @koalarx/ui@22.3.0 angular-21
```

Detalhes: patch notes no site após o release.

## [22.3.0] — Contexto AI

### Added

- Prompt de contexto AI no `kl new` e `kl init` (Cursor / GitHub Copilot / ambos / nenhum).
- Flag `--ai-context none|cursor|github|both` para pular o prompt.
- Comando `kl add ai-context cursor|github` para projetos existentes (idempotente; não sobrescreve).
- Assets `libs/cli/assets/ai-context/` (AGENTS.md, regras Cursor, instruções Copilot).
- Documentação de patch notes no site e regras de contexto do repositório (`.agents/`).

Detalhes: [Patch notes — 22.3.0](https://ui.koalarx.com/#/getting-started/patch-notes).
