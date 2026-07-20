# Koala UI – Patch notes

Changelog for anyone using or upgrading projects scaffolded with the Koala UI CLI.
Site page: https://ui.koalarx.com/#/getting-started/patch-notes
Root CHANGELOG.md mirrors these notes.

## 22.3.1 — CLI --silent

### What changed

- `--silent` flag on `kl new`, `kl init`, and `kl install`: non-interactive mode (accepts external libs and skips prompts; on new/init defaults to bun + AI context none).

### Upgrade

For AI agents or CI, prefer `kl install … --silent` and `kl new … --silent`. Interactive use without the flag is unchanged.

## 22.3.0 — AI context

### What changed

- AI context prompt in `kl new` and `kl init` (Cursor, GitHub Copilot, both, or none).
- `--ai-context none|cursor|github|both` flag to skip the interactive prompt.
- New command `kl add ai-context cursor|github` — scaffolds `AGENTS.md` plus Cursor rules / Copilot instructions. Does not overwrite existing files.
- Assets under `libs/cli/assets/ai-context/` focused on docs-first, `kl install`, and Angular (Signals/standalone).
- Patch notes documentation on the site and `CHANGELOG.md` at the repo root.

### Upgrade

On existing projects: `kl add ai-context cursor`, `github`, or both. On new projects, choose in the prompt or use `--ai-context`.
