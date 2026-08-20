# Koala UI – Get Started

Koala UI is an Angular component library inspired by shadcn/ui.
Components are installed directly into your project via the **Koala CLI**, giving you full control over the source code.

Base dependencies installed by `kl new` / `kl init`: **[@koalarx/utils](https://utils.koalarx.com/) ≥ 5** and `clsx`.
Full utils API for LLMs: [https://utils.koalarx.com/llms.txt](https://utils.koalarx.com/llms.txt).

## Version compatibility

Two support lines (like Angular current + previous):

| Line | Git branch | Docs | npm dist-tag |
|------|------------|------|--------------|
| Latest | `main` | https://ui.koalarx.com/ | `latest` |
| Previous | `previous-release` | https://ui.koalarx.com/v{major}/ | see release (e.g. `angular-21` for the 22.x line on Angular 21) |

Older majors are frozen on archive branches named by version (e.g. `22.3.0`) with no publish/deploy.

## 1. Install the CLI

```bash
npm install -g @koalarx/ui

# or
bun add -g @koalarx/ui
```

## 2. Create a new project

```bash
kl new example

# with custom package manager
kl new example --pm pnpm

# application with SSR
kl new example --ssr

# Angular library workspace
kl new example --type library

# skip AI context prompt
kl new example --ai-context none

# scaffold Cursor + Copilot context without prompting
kl new example --ai-context both

# non-interactive (AI agents / CI): bun + app + no SSR + AI context none
kl new example --silent

# non-interactive with overrides
kl new example --silent --pm pnpm --type app --ssr --ai-context both
```

Prompts (interactive, before scaffold): package manager → app/library → SSR (app only) → AI context.

During setup you can scaffold AI context (Cursor / GitHub Copilot). Use `--ai-context none|cursor|github|both` to skip the prompt.
For AI agents or CI, prefer `--silent` (non-interactive: bun + AI context none unless overridden).

## 3. Add components

```bash
kl install button,dropdown,modal

# target a specific project
kl install modal --project my-angular-app

# accept all external dependency installs without prompting (AI agents / CI)
kl install button,modal --silent
```

Use `kl install … --silent` to accept all external dependency installs without prompting (recommended for AI agents).

## 4. Add AI context (optional)

```bash
# Cursor (.cursor/rules + AGENTS.md)
kl add ai-context cursor

# GitHub Copilot (.github/copilot-instructions.md + AGENTS.md)
kl add ai-context github

# both
kl add ai-context cursor github
```

## 5. Add resources (optional)



## Available components

- **Alert** – `kl install -n alert`
- **Bottom Sheet** – `kl install -n bottom-sheet`
- **Breadcrumb** – `kl install -n breadcrumb`
- **Button** – `kl install -n button`
- **Calendar** – `kl install -n calendar`
- **Checkbox** – `kl install -n checkbox`
- **Collapse** – `kl install -n collapse`
- **Combobox** – `kl install -n combobox`
- **Confirm** – `kl install -n confirm`
- **DataTable** – `kl install -n datatable`
- **Dropdown** – `kl install -n dropdown`
- **Fieldset** – `kl install -n fieldset`
- **Inline Filter** – `kl install -n inline-filter`
- **Input CNPJ** – `kl install -n input-cnpj`
- **Input CPF** – `kl install -n input-cpf`
- **Input Color** – `kl install -n input-color`
- **Input Currency** – `kl install -n input-currency`
- **Input Field** – `kl install -n input-field`
- **Loading** – `kl install -n loading`
- **Login** – `kl install -n login`
- **Modal** – `kl install -n modal`
- **Pagination** – `kl install -n pagination`
- **Radio** – `kl install -n radio`
- **Range** – `kl install -n range`
- **Select** – `kl install -n select`
- **Side Window** – `kl install -n side-window`
- **Skeleton** – `kl install -n skeleton`
- **Stepper** – `kl install -n stepper`
- **Table** – `kl install -n table`
- **Tabs** – `kl install -n tabs`
- **Textarea** – `kl install -n textarea`
- **Text Editor** – `kl install -n text-editor`
- **Toast** – `kl install -n toast`
- **Toggle** – `kl install -n toggle`
- **Tooltip** – `kl install -n tooltip`
- **Validator** – `kl install -n validator`
- **List Base** – `kl install -n list-base`
- **Http Base** – `kl install -n http-base`
- **Page Base** – `kl install -n page-base`
- **Global Errors** – `kl install -n global-errors`
- **Rules** – `kl install -n rules`
- **Auth** – `kl install -n auth`

## Native tooling

- **Generate Icons** – ships with `kl new` / `kl init` (`generate-icons.js`). Docs: [Generate Icons](https://ui.koalarx.com/pt/icons/generate-icons).
