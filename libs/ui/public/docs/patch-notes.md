# Koala UI – Patch notes

Changelog for anyone using or upgrading projects scaffolded with the Koala UI CLI.
Site page: https://ui.koalarx.com/#/getting-started/patch-notes
Root CHANGELOG.md mirrors these notes.

## 23.0.2 — ListBase with service + getMany

### What changed

- Built-in `datalist` calls `service.getMany` and syncs `totalItems` from `count`.
- Second generic is `TListService`; constructor takes `Type<TListService>` (`super(MyService)`).
- `kl install list-base` also installs `http` (HttpBase), `is-mobile`, and `from-observable-with-signal`.

### Upgrade

Service must extend HttpBase and implement `getMany`. Replace `ListBase<T, TFilter>` with `ListBase<T, MyService>`, call `super(MyService)`, remove `override datalist` if using the default loader, and reinstall with `kl install list-base`.

## 23.0.1 — CLI --silent

### What changed

- `--silent` flag on `kl new`, `kl init`, and `kl install`: non-interactive mode (accepts external libs and skips prompts; on new/init defaults to bun + AI context none).

### Upgrade

For AI agents or CI, prefer `kl install … --silent` and `kl new … --silent`. Interactive use without the flag is unchanged.

## 23.0.0 — Angular 22 + Signal Forms

### What changed

- Docs app and CLI pins on Angular 22 / TypeScript 6.
- Form controls migrated from ControlValueAccessor to FormValueControl / FormCheckboxControl (Signal Forms; Reactive Forms and ngModel remain compatible on Angular 22).
- inline-filter migrated to Signal Forms; builder validators now use FieldValidator (({ value }) => …), not ValidatorFn.
- Removed control-changes, form-is-valid, and get-value-on-first-change utils (Reactive Forms bridges); CLI no longer scaffolds or installs them as component deps.
- Functional HTTP interceptors (withInterceptors); NgZone removed from mask/currency.
- Versioning policy: 22.x = Angular 21; 23.x = Angular 22.

### Upgrade

Upgrade consumer apps to Angular 22. Re-run `kl install` for form components (and inline-filter) to pick up FormValueControl/Signal Forms. If you pass validators to InlineFilterBuilder, replace ValidatorFn with Signal Forms FieldValidator. Delete control-changes.ts / form-is-valid.ts / get-value-on-first-change.ts if present and replace usages with field().value() / field().valid(). For Angular 21, stay on the 22.x line (angular-21 dist-tag after release).

## 22.3.0 — AI context

### What changed

- AI context prompt in `kl new` and `kl init` (Cursor, GitHub Copilot, both, or none).
- `--ai-context none|cursor|github|both` flag to skip the interactive prompt.
- New command `kl add ai-context cursor|github` — scaffolds `AGENTS.md` plus Cursor rules / Copilot instructions. Does not overwrite existing files.
- Assets under `libs/cli/assets/ai-context/` focused on docs-first, `kl install`, and Angular (Signals/standalone).
- Patch notes documentation on the site and `CHANGELOG.md` at the repo root.

### Upgrade

On existing projects: `kl add ai-context cursor`, `github`, or both. On new projects, choose in the prompt or use `--ai-context`.
