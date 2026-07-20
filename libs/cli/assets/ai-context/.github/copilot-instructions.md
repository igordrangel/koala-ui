# Koala UI — agent instructions

This project was scaffolded with `kl` (Koala UI). UI components and resources are **copied** into the repo — do **not** invent runtime imports of components from `@koalarx/ui`.

## Docs first

Before inventing APIs or patterns, read the relevant topic from the indexes:

- UI (latest): https://ui.koalarx.com/llms.txt
- UI (previous support line): https://ui.koalarx.com/v{major}/llms.txt (e.g. `/v22/llms.txt`)
- Utils: https://utils.koalarx.com/llms.txt

Useful entry points: [Get Started](https://ui.koalarx.com/docs/get-started.md), component pages under https://ui.koalarx.com/docs/<slug>.md (previous line: `/v{major}/docs/<slug>.md`). Prefer the MCP server `koala-ui-docs` when available (`read_koala_ui_doc`, `search_koala_ui_docs`, `list_koala_ui_docs`).

## Hard constraints

- Install missing pieces with `kl install <component[,component]> --silent`. Components land under `src/app/shared/components/`. Always pass `--silent` so external dependency prompts do not block the agent.
- Prefer Signals, standalone components, and path aliases (`@/*` → `src/app/*`) from `kl new` / `kl init`. For non-interactive scaffolding use `kl new <name> --silent` (or `--pm` / `--ai-context`).
- Base deps: `@koalarx/utils` ≥ 5 and `clsx`. Prefer documented Utils prototypes (e.g. `.orderBy()`).
- Import installed UI from `@/shared/components/...` (or the local path already used in this repo). Follow existing `imports` arrays on standalone components.
- Do not invent undocumented directives, inputs, or APIs — match docs and the sources already in this tree.

## New UI recipe

1. Check whether the component/resource already exists under `src/app/shared/`.
2. If missing: `kl install button,modal --silent` (or the needed names); `--silent` accepts all external libs without prompting.
3. Read the docs page for each piece before wiring templates.
4. Compose with documented patterns (fieldset + inputs, toast feedback, modal/side-window, etc.).
5. Keep styles aligned with the project theme (Tailwind / DaisyUI setup from scaffolding).
