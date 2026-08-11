# Changelog

Todas as mudanças notáveis deste projeto são documentadas neste arquivo e na documentação web:

- [Patch notes](https://ui.koalarx.com/#/getting-started/patch-notes) (site)
- AI: [patch-notes.md](https://ui.koalarx.com/docs/patch-notes.md)

O conteúdo principal da página web vive em `libs/ui/src/app/core/i18n/docs/pages/patch-notes.ts`. Mantenha este arquivo e o `CHANGELOG.md` alinhados ao publicar versões.

Formato inspirado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [22.3.3] — Sem vazamento de docs na CLI

### Fixed

- `kl new` deixa de copiar o `index.html` das docs (script de migração hash/locale e redirect `/v{n}/` → `ui.koalarx.com`).
- `kl install auth` deixa de depender de `LocaleService` / i18n das docs (que não eram publicados no pacote).

### Upgrade

1. Em projetos já gerados: remova o `<script>` de migração de hash/versão do `src/index.html`.
2. Se usa `auth`: `kl install auth` (ou remova imports de `../i18n/locale.service` nos arquivos de core copiados).

## [22.3.1] — CLI `--silent`

### Added

- Flag `--silent` em `kl new`, `kl init` e `kl install` para modo não interativo (aceita libs externas sem prompt; no `new`/`init` defaults `bun` + AI context `none`).

Detalhes: [Patch notes — 22.3.1](https://ui.koalarx.com/#/getting-started/patch-notes).

## [22.3.0] — Contexto AI

### Added

- Prompt de contexto AI no `kl new` e `kl init` (Cursor / GitHub Copilot / ambos / nenhum).
- Flag `--ai-context none|cursor|github|both` para pular o prompt.
- Comando `kl add ai-context cursor|github` para projetos existentes (idempotente; não sobrescreve).
- Assets `libs/cli/assets/ai-context/` (AGENTS.md, regras Cursor, instruções Copilot).
- Documentação de patch notes no site e regras de contexto do repositório (`.agents/`).

Detalhes: [Patch notes — 22.3.0](https://ui.koalarx.com/#/getting-started/patch-notes).
