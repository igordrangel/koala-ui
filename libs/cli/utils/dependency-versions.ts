/**
 * Pinned dependency ranges installed by the CLI.
 * Keep in sync with libs/ui/package.json and the root package.json where applicable.
 */
export const DEPENDENCY_VERSIONS = {
  '@angular/aria': '^22.0.4',
  '@angular/cli': '^22.0.6',
  '@koalarx/utils': '^5.0.0',
  '@playwright/test': '^1.59.1',
  '@tiptap/extension-file-handler': '^3.27.1',
  '@tiptap/extension-highlight': '^3.27.1',
  '@tiptap/extension-image': '^3.27.1',
  '@tiptap/extension-table': '^3.27.1',
  '@tiptap/extension-text-align': '^3.27.1',
  '@tiptap/starter-kit': '^3.27.1',
  '@types/node': '^25.3.0',
  '@vitest/eslint-plugin': '^1.6.6',
  'angular-eslint': '^22.1.0',
  cally: '^0.9.2',
  clsx: '^2.1.1',
  daisyui: '^5.5.19',
  'eslint-plugin-prettier': '^5.5.5',
  jsdom: '^28.0.0',
  'jwt-decode': '^4.0.0',
  'ngx-tiptap': '^14.0.1',
  'typescript-eslint': '^8.53.1',
  vitest: '^4.0.8',
} as const;

export type ManagedDependency = keyof typeof DEPENDENCY_VERSIONS;

/** Appends a pinned version range when the package is managed by the CLI. */
export function withVersion(pkg: string): string {
  const version = DEPENDENCY_VERSIONS[pkg as ManagedDependency];
  return version ? `${pkg}@${version}` : pkg;
}

/** Maps package names to versioned install specs. */
export function withVersions(packages: string[]): string[] {
  return packages.map(withVersion);
}
