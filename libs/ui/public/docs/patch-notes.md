# Koala UI – Patch notes

Changelog for anyone using or upgrading projects scaffolded with the Koala UI CLI.
Site page: https://ui.koalarx.com/pt/getting-started/patch-notes
Root CHANGELOG.md mirrors these notes.

## 23.1.1 — Docs: patch notes and generate-icons

### What changed

- Site patch notes list every section from `patch-notes.ts` (includes 23.1.0).
- `docs/patch-notes.md` and `generate:llms` now include 23.1.0+.
- Sitemap includes `resources/generate-icons`; public links use `/pt/...` instead of hash.

### Upgrade

Docs redeploy only; no consumer project changes.

## 23.1.0 — CLI app/library/SSR, Signal Forms, pagination

### What changed

- Currency mask: `input` listener + value→DOM sync (IME/autofill).
- Pagination: active page `btn-primary`; queryParams `page`/`limit`; default limit 30.
- Inline-filter desktop on Signal Forms; mobile-picker hydrates URL filters on init.
- Root services use `@Service()` (Angular 22).
- `kl new`: app|library + SSR prompts; AI context before scaffold; `--type` / `--ssr` flags.
- CLI build aligned with koala-nest (`Bun.Transpiler`, bin `./cli/index.js`).
- Native generate-icons documentation (Resources).
- Docs version switcher: stable labels (companion 22.x line syncs `DOCS_VERSIONS`).

### Upgrade

Reinstall `currency` and `inline-filter` if you already have older copies (`kl install currency,inline-filter`). Pagination now writes `limit` to the URL (legacy `pageSize` is still read). For agents/CI: `kl new <name> --silent [--type app|library] [--ssr|--no-ssr]`.

## 23.0.3 — No docs leakage in the CLI

### What changed

- `kl new` uses a consumer `index.html` (no docs version/locale migration script).
- `kl install auth` no longer depends on `LocaleService` / docs i18n.

### Upgrade

On existing projects: remove the hash/version migration `<script>` from `src/index.html`. If you use auth, reinstall with `kl install auth` (or drop `../i18n/locale.service` imports from the copied core files).

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
