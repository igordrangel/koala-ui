# Patch notes e changelog

Ao introduzir mudanças **visíveis** na CLI, nos templates/assets instalados nos projetos, ou em APIs documentadas dos componentes/resources:

1. Atualize **`libs/ui/src/app/core/i18n/docs/pages/patch-notes.ts`** (PT e EN) — fonte da verdade para a página Getting Started → Patch notes.
2. Atualize **`CHANGELOG.md`** na raiz na seção da versão que está subindo (sem seção `[Unreleased]` — só o que já foi ou será publicado).
3. Se a mudança afetar onboarding ou scripts destacados, ajuste o **`README.md`** e as cópias de instalação/introdução quando fizer sentido.
4. Não mantenha camadas legadas “só por compatibilidade” na CLI — documente o upgrade nos patch notes.
5. Se a mudança alterar padrões que agentes devem seguir no projeto gerado (estrutura Angular, install CLI, docs URLs, utils), revise **`libs/cli/assets/ai-context/`** (`AGENTS.md`, `.cursor/rules`, Copilot instructions) para o contexto de agentes dos consumidores não ficar desatualizado.

## O que registrar

- Breaking changes e passos de upgrade em projetos já gerados
- Novos comportamentos da CLI (`new`, `init`, `install`, `add`)
- Remoção de APIs/comandos/padrões
- Novas docs ou mudanças de fluxo recomendado

## O que não precisa

- Refactors internos sem impacto no usuário
- Correções de typo/testes sem mudança de comportamento

## Após editar docs

Rode `bun run generate:llms` **na branch da linha afetada** (`main` ou `previous-release`) para regenerar `public/docs/*.md`, `llms.txt` e o search index. O deploy de docs compõe latest na raiz e previous em `/v{major}/`.
