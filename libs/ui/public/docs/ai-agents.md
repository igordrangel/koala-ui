# Koala UI – AI Agents

IDE-agnostic agent context for projects scaffolded with the Koala UI CLI.
Site page: https://ui.koalarx.com/pt/getting-started/ai-agents

## What it is

The agents pack writes an `AGENTS.md` index at the project root plus instructions and skills under `.agents/`. Agents start from `AGENTS.md` and open the linked files for the task — works in Cursor, GitHub Copilot, and other IDEs that read `AGENTS.md`.

## How to install

```bash
# IDE-agnostic agents context (AGENTS.md + .agents/)
kl add agents

# during new / init
kl new example --agents
kl init --agents

# skip agents scaffolding
kl new example --no-agents
kl init --no-agents
```

`kl add agents` removes legacy Koala Cursor/Copilot scaffolding (`.cursor/rules/koala-*.mdc`, `.github/copilot-instructions.md`) if present, then writes the new pack (force).

## Generated structure

```text
AGENTS.md
.agents/
  instructions/
    structure.md
    components.md
    angular.md
    docs.md
  skills/
    code-review.md
```

`AGENTS.md` is only the index (When → Read). Details live in `.agents/instructions/` and `.agents/skills/`.

## Code review skill

Ask the agent:

```text
Faça uma revisão completa utilizando os padrões Koala
```

The skill covers best practices, Angular team patterns (Angular MCP when available), Clean Code, abstraction/componentization, and library-standard usage (docs / `koala-ui-docs` MCP / `kl install`).

## Recommended MCPs

- `koala-ui-docs` — `read_koala_ui_doc`, `search_koala_ui_docs`, `list_koala_ui_docs`
- Angular (`angular-cli` via `@angular/cli mcp`) — https://angular.dev/ai/mcp

## Upgrade from old AI context

Projects that used `kl add ai-context` should run `kl add agents` once.
