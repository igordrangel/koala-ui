/**
 * Support lines shown in the docs version selector.
 * Latest (`main`) is always `basePath: '/'`.
 * Previous line (`previous-release`) is hosted at `/v{major}/` after CI compose.
 *
 * Keep this list identical on `main` and `previous-release` so the selector
 * can navigate between deployed lines. Update on every major bump.
 */
export interface DocsVersionEntry {
  /** Library major for this line (e.g. "22"). */
  major: string;
  /** Site prefix on the composed Pages deploy (`/` or `/v22/`). */
  basePath: string;
  /** Short label in the header switcher. */
  label: string;
}

/** Latest (`main` 23.x) at `/`; previous-release (22.x) compose at `/v22/`. */
export const DOCS_VERSIONS: readonly DocsVersionEntry[] = [
  { major: '23', basePath: '/', label: 'v23' },
  { major: '22', basePath: '/v22/', label: 'v22' },
] as const;
