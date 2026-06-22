# Documentação de componentes e resources

Guia para adicionar novos itens à documentação web, LLM e CLI do Koala UI.

## Pipeline

```
public/markdown/install/*.md     → comando kl install
public/markdown/usage/<slug>/    → exemplos e API (overview.md + *.ts.md)
features/<tipo>/<slug>/          → página Angular interativa
scripts/generate-llms.js         → public/docs/*.md, llms.txt, llms-full.txt
```

Após alterações, rode `bun run generate:llms` antes do build de docs.

## Tipos de documentação

| Tipo | Pasta web | Snippet install | Snippet usage |
|------|-----------|-----------------|---------------|
| Component | `features/components/` | `<name>-install.md` | `usage/<name>/*.html.md` + `*.ts.md` |
| Block | `features/blocks/` | idem | idem |
| Resource | `features/resources/` | idem | `usage/<name>/overview.md` + `*.ts.md` |

Para resources, use `overview.md` (não `<name>.md`) para evitar o heading `### Md` no gerador.

## Checklist — novo component

1. Implementar em `libs/ui/src/app/shared/components/<name>/`
2. Adicionar flag em `libs/cli/utils/install-component.ts` (`InstallComponentFlagsList` + deps no `switch`)
3. Criar `libs/ui/public/markdown/install/<name>-install.md`
4. Criar snippets em `libs/ui/public/markdown/usage/<name>/`
5. Criar página em `libs/ui/src/app/features/components/<name>/`
6. Registrar rota em `features/components/routes.ts`
7. Adicionar item em `nav-menu.ts`
8. Registrar em `scripts/generate-llms.js` (`COMPONENTS`)
9. Rodar `bun run generate:llms`
10. Adicionar testes CLI se houver lógica de deps nova

## Checklist — novo resource

1. Implementar código (base em `shared/base/`, core em `core/`, etc.)
2. Garantir cópia no build: `scripts/build.js` já copia `shared/base`, `core/*`, `shared/utils`
3. Adicionar flag CLI:
   - **Base abstrata**: estender `install-base.ts` + case em `install-component.ts`
   - **Core resource**: estender `install-core-resource.ts` + case em `install-component.ts`
   - **Só documentação**: referenciar comando existente (ex.: Rules → `kl install auth`)
4. Criar install + usage snippets (ver tabela acima)
5. Criar página em `features/resources/<slug>/`
6. Registrar rota em `features/resources/routes.ts`
7. Remover `commingSoon: true` do `nav-menu.ts`
8. Registrar em `generate-llms.js`
9. Rodar `bun run generate:llms`
10. Testes: `install-component.unit.spec.ts` para deps, `install-base.unit.spec.ts` ou `install-core-resource.unit.spec.ts` para cópia

## CLI — padrões de dependência

```ts
// Base abstrata (HttpBase, PageBase, ListBase)
baseDeps.push('http');
utilDeps.push('download-buffer-file');

// Core resource (interceptors, guards, utils)
coreResourceDeps.push('interceptors/feedback-request-interceptor');
// Registrar app.config em install-core-resource.ts quando aplicável

// Componente dependente
componentDeps.push('toast');
```

## Cross-links

Documente relações entre resources na seção Usage das páginas web e nos arquivos `overview.md` (links relativos `./other-resource.md`).

## Validação

- [ ] Página web abre em `#/resources/<slug>` ou `#/components/<name>`
- [ ] "Copy for AI" aponta para `/docs/<slug>.md`
- [ ] `llms.txt` lista o novo item
- [ ] `bun run test:cli` passa
