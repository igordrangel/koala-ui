# Skill — revisão completa (padrões Koala)

## Ativação

Use esta skill quando o usuário pedir:

> Faça uma revisão completa utilizando os padrões Koala

## Objetivo

Revisar o código em questão (diff, arquivos abertos ou escopo pedido) e devolver achados priorizados com sugestões concretas, alinhadas a `.agents/instructions/` e à documentação Koala / Angular.

## Checklist

### 1. Boas práticas

- TypeScript tipado, APIs Angular atuais do projeto, acessibilidade e consistência com o restante do app.
- Evitar anti-padrões legados quando o projeto já usa Signals / standalone.

### 2. Padrões estabelecidos pelo time do Angular (MCP)

Quando o MCP Angular estiver disponível (`angular-cli` via `@angular/cli mcp` — ver https://angular.dev/ai/mcp), consulte-o para validar convenções oficiais do framework (estrutura, APIs, melhores práticas do time Angular).
Se o MCP não estiver disponível, aplique as mesmas ideias com base na documentação Angular e em [`.agents/instructions/angular.md`](../instructions/angular.md).

### 3. Clean Code

- Nomes claros, funções/componentes com responsabilidade única, pouca complexidade acidental.
- Side effects explícitos; evitar lógica espalhada em templates ou serviços genéricos demais.

### 4. Abstração e componentização

- Extrair UI e lógica reutilizáveis quando houver repetição ou misturas de responsabilidades.
- Evitar “god components”; preferir composição com componentes/diretivas/utils já instalados.

### 5. Uso definido e padronizado pela biblioteca

- Sem imports runtime de componentes UI a partir de `@koalarx/ui` — código copiado / `kl install … --silent`.
- Imports locais (`@/shared/components/...`), Signal Forms / controles Koala quando couber, Utils documentados.
- Não inventar APIs: docs ou MCP `koala-ui-docs` (`read_koala_ui_doc`, `search_koala_ui_docs`, `list_koala_ui_docs`).
- Conferir [structure](../instructions/structure.md), [components](../instructions/components.md) e [docs](../instructions/docs.md).

## Formato da resposta

1. Resumo (1–3 frases).
2. Achados por prioridade (alta / média / baixa), cada um com arquivo/trecho e sugestão acionável.
3. Itens ok (breve), se houver.
4. Próximos passos opcionais (só se agregarem valor).
