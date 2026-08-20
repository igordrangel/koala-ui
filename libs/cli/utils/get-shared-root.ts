import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

interface KoalaConfig {
  sharedRoot?: string;
  coreRoot?: string;
  stylesPath?: string;
  themeRoot?: string;
  appConfigPath?: string | null;
}

export interface ProjectLayout {
  /** Absolute path to shared/ (components, utils, …). */
  sharedRoot: string;
  /** Absolute path to core/ (guards, interceptors, …). */
  coreRoot: string;
  /** Absolute path to the main styles.css. */
  stylesPath: string;
  /** Absolute path to theme/ CSS folder. */
  themeRoot: string;
  /**
   * Absolute path to app.config.ts when the project has an application.
   * `null` for library-only workspaces (skip app.config wiring).
   */
  appConfigPath: string | null;
}

function readKoalaConfig(projectFolder: string): KoalaConfig {
  const koalaJsonPath = path.join(projectFolder, 'koala.json');
  if (!existsSync(koalaJsonPath)) {
    return {};
  }

  try {
    return JSON.parse(readFileSync(koalaJsonPath, 'utf-8')) as KoalaConfig;
  } catch {
    return {};
  }
}

function resolveOptional(
  projectFolder: string,
  relativeOrNull: string | null | undefined,
  fallback: string,
): string {
  if (relativeOrNull == null || relativeOrNull === '') {
    return path.join(projectFolder, fallback);
  }
  return path.isAbsolute(relativeOrNull)
    ? relativeOrNull
    : path.join(projectFolder, relativeOrNull);
}

export function getProjectLayout(projectFolder: string): ProjectLayout {
  const config = readKoalaConfig(projectFolder);

  const sharedRoot = resolveOptional(projectFolder, config.sharedRoot, 'src/app/shared');
  const coreRoot = resolveOptional(projectFolder, config.coreRoot, 'src/app/core');
  const stylesPath = resolveOptional(projectFolder, config.stylesPath, 'src/styles.css');
  const themeRoot = resolveOptional(projectFolder, config.themeRoot, 'src/theme');

  let appConfigPath: string | null;
  if (config.appConfigPath === null) {
    appConfigPath = null;
  } else if (config.appConfigPath) {
    appConfigPath = resolveOptional(projectFolder, config.appConfigPath, 'src/app/app.config.ts');
  } else {
    const defaultAppConfig = path.join(projectFolder, 'src/app/app.config.ts');
    appConfigPath = existsSync(defaultAppConfig) ? defaultAppConfig : null;
  }

  return { sharedRoot, coreRoot, stylesPath, themeRoot, appConfigPath };
}

/** @deprecated Prefer getProjectLayout().sharedRoot */
export function getSharedRoot(projectFolder: string): string {
  return getProjectLayout(projectFolder).sharedRoot;
}
