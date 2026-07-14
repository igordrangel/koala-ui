# Koala UI – Patch notes

Changelog for anyone using or upgrading projects scaffolded with the Koala UI CLI.
Site page: https://ui.koalarx.com/#/getting-started/patch-notes
Root CHANGELOG.md mirrors these notes.

## 22.3.0 — AI context

### What changed

- AI context prompt in `kl new` and `kl init` (Cursor, GitHub Copilot, both, or none).
- `--ai-context none|cursor|github|both` flag to skip the interactive prompt.
- New command `kl add ai-context cursor|github` — scaffolds `AGENTS.md` plus Cursor rules / Copilot instructions. Does not overwrite existing files.
- Assets under `libs/cli/assets/ai-context/` focused on docs-first, `kl install`, and Angular (Signals/standalone).
- Patch notes documentation on the site and `CHANGELOG.md` at the repo root.

### Upgrade

On existing projects: `kl add ai-context cursor`, `github`, or both. On new projects, choose in the prompt or use `--ai-context`.
