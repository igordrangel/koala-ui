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

During project creation, the CLI asks which package manager you want to use and optionally scaffolds AI context (Cursor / GitHub Copilot):

- `bun`
- `npm`
- `yarn`
- `pnpm`

You can also skip the interactive prompts with `--pm` and `--ai-context`.

```bash
kl new --name meu-projeto
kl new --name my-project --pm npm
kl new my-app --ai-context both
```

---

### `kl install`

Adds one or more UI components to the project.

```bash
kl install button
kl install button,loading,dropdown
kl install modal --project meu-projeto
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
```

---

### `kl version`

Shows the installed CLI version.

```bash
kl version
```

---

## Documentation

For detailed installation guides, usage instructions, patch notes, and examples for each component, visit the official documentation:

**[ui.koalarx.com](https://ui.koalarx.com)** · [Patch notes](https://ui.koalarx.com/#/getting-started/patch-notes) · [CHANGELOG.md](./CHANGELOG.md)
