# Changelog

Todas as mudanças notáveis deste projeto são documentadas neste arquivo e na documentação web:

- [Patch notes](https://ui.koalarx.com/#/getting-started/patch-notes) (site)
- AI: [patch-notes.md](https://ui.koalarx.com/docs/patch-notes.md)

O conteúdo principal da página web vive em `libs/ui/src/app/core/i18n/docs/pages/patch-notes.ts`. Mantenha este arquivo e o `CHANGELOG.md` alinhados ao publicar versões.

Formato inspirado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## Política de versão

A partir de **22.4.0**, o major de `@koalarx/ui` acompanha o major do Angular. As releases `22.0.0`–`22.3.0` foram publicadas ainda com Angular 21; use `21.2.x` para Angular 21 ou `>=22.4.0` para Angular 22.

## [22.4.0] — Angular 22 + Signal Forms

### Changed

- Upgrade da docs app e pins da CLI para **Angular 22** / TypeScript 6.
- Controles de formulário migrados de `ControlValueAccessor` para `FormValueControl` / `FormCheckboxControl` (Signal Forms + compat Reactive/Template).
- Interceptors HTTP funcionais; remoção de padrões zoneless legados (`NgZone` em mask/currency).

### Fixed

- Realinhamento de versionamento: `22.4+` = Angular 22; linha `21.x` permanece para Angular 21.

### Release (npm)

Após publicar `22.4.0`:

```bash
npm dist-tag add @koalarx/ui@22.4.0 latest
npm dist-tag add @koalarx/ui@21.2.4 angular-21
npm deprecate "@koalarx/ui@>=22.0.0 <22.4.0" "Publicada com Angular 21 por engano. Use 21.2.x (Angular 21) ou >=22.4.0 (Angular 22)."
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
