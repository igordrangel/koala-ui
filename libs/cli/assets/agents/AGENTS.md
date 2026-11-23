# Koala UI — agent instructions

This project was scaffolded with `kl` (Koala UI). UI components and resources are **copied** into the repo — do **not** invent runtime imports of components from `@koalarx/ui`.

Start here. Detailed guidance lives under `.agents/` — open the file that matches the task.

## Docs first

- UI (latest): https://ui.koalarx.com/llms.txt
- UI (previous support line): https://ui.koalarx.com/v{major}/llms.txt (e.g. `/v22/llms.txt`)
- Utils: https://utils.koalarx.com/llms.txt
- Prefer MCP `koala-ui-docs` when available (`read_koala_ui_doc`, `search_koala_ui_docs`, `list_koala_ui_docs`).
- Guide: https://ui.koalarx.com/docs/ai-agents.md

## When → Read

| Task | Open |
|------|------|
| Project layout, copy model, path aliases | [`.agents/instructions/structure.md`](.agents/instructions/structure.md) |
| Install / compose UI components | [`.agents/instructions/components.md`](.agents/instructions/components.md) |
| Angular conventions (Signals, forms, services) | [`.agents/instructions/angular.md`](.agents/instructions/angular.md) |
| Docs / MCP before inventing APIs | [`.agents/instructions/docs.md`](.agents/instructions/docs.md) |
| Full code review (Koala standards) | [`.agents/skills/code-review.md`](.agents/skills/code-review.md) |

## Skills

To run a full code review with Koala standards, ask the agent:

> Faça uma revisão completa utilizando os padrões Koala
