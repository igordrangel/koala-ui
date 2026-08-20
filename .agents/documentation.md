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
| Icons | `features/icons/` | docs-only (sem `kl install`) | `usage/generate-icons/overview.md` | URL do site: `/pt/icons` |

Para resources, use `overview.md` (não `<name>.md`) para evitar o heading `### Md` no gerador.

## Checklist — novo component

1. Implementar em `libs/ui/src/app/shared/components/<name>/`
2. Adicionar flag em `libs/cli/utils/install-component.ts` (`InstallComponentFlagsList` + deps no `switch`). Se usar ícones SVG customizados, registrar em `install-icon.ts` e copiar os arquivos em `build.js` (`dist/ui/assets/icons`)
3. Criar `libs/ui/public/markdown/install/<name>-install.md`
4. Criar snippets em `libs/ui/public/markdown/usage/<name>/`
5. Criar página em `libs/ui/src/app/features/components/<name>/`
6. Registrar rota em `features/components/routes.ts`
7. Adicionar item em `nav-menu.ts`
8. Registrar em `scripts/generate-llms.js` (`COMPONENTS`)
9. Incluir o path em **`libs/ui/scripts/post-build.mjs`** → `DOC_PATHS` (sitemap), ex.: `'components/<name>'`
10. Rodar `bun run generate:llms`
11. Adicionar testes CLI se houver lógica de deps nova

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
7. Remover `commingSoon: true` do `nav-menu.ts` (ou adicionar o item no grupo certo)
8. Registrar em `generate-llms.js`
9. Incluir o path em **`libs/ui/scripts/post-build.mjs`** → `DOC_PATHS` (sitemap), ex.: `'resources/<slug>'`
10. Rodar `bun run generate:llms`
11. Testes: `install-component.unit.spec.ts` para deps, `install-base.unit.spec.ts` ou `install-core-resource.unit.spec.ts` para cópia

Links públicos usam path com locale (`https://ui.koalarx.com/pt/resources/<slug>`), não hash `#/...`.

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

// Tema CSS
cssDeps.push('editor');

// Ícones SVG (copia para public/assets/icons e roda generate-icons.js)
iconSetDeps.push('text-editor-icons');
```

For API image upload, also install HttpBase:

```bash
kl install http-base
```

Pair with [Http Base](./http-base.md) when implementing `TextEditorFileService`.

## Cross-links

Documente relações entre resources na seção Usage das páginas web e nos arquivos `overview.md` (links relativos `./other-resource.md`).

## Validação

- [ ] Página web abre em `/pt/resources/<slug>` ou `/pt/components/<name>` (e sob `/v{major}/…` na linha previous)
- [ ] "Copy for AI" aponta para o `docs/<slug>.md` da linha atual (root ou `/v{major}/docs/…`)
- [ ] `llms.txt` da linha lista o novo item
- [ ] `bun run test:cli` passa

## Suporte dual — branches `main` + `previous-release`

Duas majors ativas (como Angular current + previous):

| Branch | Papel | npm dist-tag | Docs Pages |
|--------|--------|--------------|------------|
| `main` | latest | `latest` | `https://ui.koalarx.com/` |
| `previous-release` | major anterior | ver `.github/release-lines.json` → `previousDistTag` | `https://ui.koalarx.com/v{major}/` |
| `{version}` (ex. `22.3.0`) | arquivo morto | nenhum | nenhum |

- Em **cada** branch, `public/markdown/` e `public/docs/` são planos e referem **só** a lib daquela linha. Não criar `markdown/22`, `docs/23`, etc.
- O seletor de versão no header navega entre as bases compostas na CI (`/` ↔ `/v{major}/`), não troca markdown dentro do mesmo build.
- Lista do seletor: [`libs/ui/src/app/core/constants/docs-versions.ts`](../libs/ui/src/app/core/constants/docs-versions.ts) — manter **igual** em `main` e `previous-release`.
- Publish/deploy: push em `main` ou `previous-release` monta as duas linhas de docs; npm usa `latest` ou `previousDistTag`.
- Environment GitHub Pages deve permitir deploy de **ambas** as branches (`main` e `previous-release`) nas deployment branch policies.

### Major bump (ex.: lançar 24)

1. Anotar a versão em `previous-release` (`package.json`).
2. Criar branch de arquivo com esse nome: `git branch 22.3.0 previous-release` (sem CI).
3. Atualizar `previous-release` para o tip de `main`.
4. Em `main`, subir a major nova e desenvolver.
5. Atualizar em **ambos** os branches ativos: `docs-versions.ts`, `.github/release-lines.json` (`previousDistTag`), ai-context / README se as URLs da linha previous mudarem.

### Docs nesta branch

Edite markdown/páginas **nesta** linha e rode `bun run generate:llms` aqui. Hotfix da linha previous = commit em `previous-release`.
