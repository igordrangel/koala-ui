<div align="center">
  <h1>@koalarx/ui</h1>
  <p>CLI for creating and managing Angular projects with ready-to-use UI components.</p>

[![npm version](https://img.shields.io/npm/v/@koalarx/ui)](https://www.npmjs.com/package/@koalarx/ui)
[![license](https://img.shields.io/npm/l/@koalarx/ui)](./LICENSE)

**[📖 Full Documentation → ui.koalarx.com](https://ui.koalarx.com)**

</div>

---

## Installation

```bash
npm install -g @koalarx/ui
```

or with bun:

```bash
bun add -g @koalarx/ui
```

---

## Commands

### `kl new`

Creates a new Angular project with the Koala structure and dependencies already configured.

Interactive prompts (before scaffold): package manager → app/library → SSR (app only) → AI context (Cursor / GitHub Copilot).

Package managers: `bun`, `npm`, `yarn`, `pnpm`.

Skip prompts with `--pm`, `--type app|library`, `--ssr` / `--no-ssr`, `--ai-context`, and `--silent` (non-interactive defaults: bun + app + no SSR + AI context none).

```bash
kl new --name meu-projeto
kl new --name my-project --pm npm
kl new my-app --ssr
kl new my-lib --type library
kl new my-app --ai-context both
kl new my-app --silent
```

---

### `kl install`

Adds one or more UI components to the project.

Use `--silent` to accept all external dependency installs without prompting (recommended for AI agents and CI).

```bash
kl install button
kl install button,loading,dropdown
kl install modal --project meu-projeto
kl install button,modal --silent
```

---

### `kl add`

Adds project features. Currently supports AI context scaffolding:

```bash
kl add ai-context cursor
kl add ai-context github
kl add ai-context cursor github
```

---

### `kl init`

Initializes an existing Angular project with the Koala structure and required tooling.

```bash
kl init
kl init --project meu-projeto
kl init --project meu-projeto --verbose
kl init --ai-context none
kl init --silent
```

---

### `kl version`

Shows the installed CLI version.

```bash
kl version
```

---

## Support lines (`main` + `previous-release`)

| Line | Branch | Docs | npm dist-tag |
|------|--------|------|--------------|
| Latest | `main` | [ui.koalarx.com](https://ui.koalarx.com/) | `latest` |
| Previous | `previous-release` | [ui.koalarx.com/v{major}/](https://ui.koalarx.com/v22/) | configured in [`.github/release-lines.json`](.github/release-lines.json) (`previousDistTag`, e.g. `angular-21`) |

Archive branches (e.g. `22.3.0`) keep frozen majors without CI. On a major bump: create the archive from `previous-release`, move current `main` into `previous-release`, then develop the new major on `main`. See `.agents/documentation.md`.

Library major tracks Angular major (`22.x` → Angular 21, `23.x` → Angular 22).

## Documentation

For detailed installation guides, usage instructions, patch notes, and examples for each component, visit the official documentation:

**[ui.koalarx.com](https://ui.koalarx.com)** · previous line under `/v{major}/` · [Patch notes](https://ui.koalarx.com/pt/getting-started/patch-notes) · [CHANGELOG.md](./CHANGELOG.md)
