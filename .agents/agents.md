# Koala UI — agent instructions

Angular component library (shadcn-style). Components and resources are **copied** into consumer projects via `kl` — do **not** invent runtime imports of UI components from `@koalarx/ui`.

## Docs first

Before inventing APIs or patterns, read the relevant topic from the indexes:

- UI: https://ui.koalarx.com/llms.txt
- Utils: https://utils.koalarx.com/llms.txt

Useful entry points: [Get Started](https://ui.koalarx.com/docs/get-started.md), [Installation](https://ui.koalarx.com/#/getting-started/installation), [Patch notes](https://ui.koalarx.com/#/getting-started/patch-notes). Prefer the MCP server `koala-ui-docs` when available (`read_koala_ui_doc`, `search_koala_ui_docs`, `list_koala_ui_docs`).

## When → Read

| Task | Open (repo path) |
|------|------------------|
| New component / block / resource docs | `.agents/documentation.md` |
| Major bump / `main` + `previous-release` support lines | `.agents/documentation.md` → “Suporte dual” |
| User-facing CLI or generated-project change (patch notes) | `.agents/patch-notes.md` |
| Consumer AI context (`kl new` / `init` / `add ai-context`) | `libs/cli/assets/ai-context/` — keep in sync after docs/pattern changes (see below) |
| CLI install / deps / copy paths | `libs/cli/utils/install-component.ts` + related install helpers |
| Masks, dates, arrays, prototypes (`@koalarx/utils`) | https://utils.koalarx.com/llms.txt |

## Hard constraints

- Components live under `libs/ui/src/app/shared/components/` and are installed into consumer apps via `kl install` (destination typically `src/app/shared/components/`).
- Prefer Signals, standalone components, and path aliases (`@/*` → `src/app/*`) from `kl new` / `kl init`.
- Base deps: `@koalarx/utils` ≥ 5 and `clsx`. Prefer Utils prototypes where documented.
- Do not invent undocumented directives, inputs, or APIs — follow published docs and local installed sources.
- Prefer Bun for this monorepo’s tooling.
- Active support lines: `main` (latest) + `previous-release` (previous major). On major change, freeze previous into an archive branch named by version, promote `main` → `previous-release`, and develop the new major on `main` — do not overwrite the previous line’s docs/code in place. Markdown/docs stay flat per branch (no `markdown/{major}/` folders).

## Maintaining agent context

Context must stay **VS Code (Copilot) + Cursor compatible**. Same files, no editor fork.

- Canonical body: **`.agents/agents.md` only**. Root `AGENTS.md` and `.github/copilot-instructions.md` are symlinks — never duplicate the text.
- Keep this file short: index + hard constraints only.
- Put detailed procedures in `.agents/*.md` playbooks; link them from the When→Read map (repo-root paths).
- Path-scoped: `.github/instructions/*.instructions.md` (`applyTo` frontmatter) are pointers only — no copied bodies.
- **Never** create `.cursor/`, `.cursor/rules/`, or `*.mdc` Cursor-only rules in this repo. Cursor already reads `AGENTS.md` / Copilot instructions; path-scoped guidance goes under `.github/instructions/`.
- Prefer adding a reference over pasting long guidance here.
- **Consumer AI scaffolding:** `libs/cli/assets/ai-context/` is copied into projects via `kl new` / `kl init` / `kl add ai-context`. After changing install patterns, docs URLs, hard constraints, or Angular conventions that agents must know, **review and update** those assets (and related CLI install/detect if needed) so generated agent context stays accurate.
