import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { getOriginPath } from './get-package-root';
import { ensureStylesImport } from './ensure-styles-import';
import { getProjectPath } from './project-path';
import { runCommand } from './run-command';
export const TEXT_EDITOR_ICON_FILES = [
  'add-image',
  'add',
  'blockquote',
  'code-block',
  'enter',
  'grid-col',
  'grid-row',
  'heading-h1',
  'heading-h2',
  'heading-h3',
  'heading-h4',
  'highlight',
  'trash',
] as const;

export const InstallIconSetFlagsList = ['text-editor-icons'] as const;
export type InstallIconSetFlags = (typeof InstallIconSetFlagsList)[number];

export async function installIconSet(
  projectName: string,
  iconSet: InstallIconSetFlags,
): Promise<string[]> {
  const projectFolder = getProjectPath(projectName);
  const targetFolder = `${projectFolder}/public/assets/icons`;
  const installed: string[] = [];

  mkdirSync(targetFolder, { recursive: true });
  mkdirSync(`${projectFolder}/src/theme`, { recursive: true });

  const icons =
    iconSet === 'text-editor-icons' ? TEXT_EDITOR_ICON_FILES : ([] as readonly string[]);

  for (const icon of icons) {
    const origin = `${getOriginPath()}/ui/assets/icons/${icon}.svg`;
    const target = `${targetFolder}/${icon}.svg`;

    if (existsSync(origin)) {
      cpSync(origin, target);
      installed.push(icon);
    }
  }

  if (installed.length === 0) {
    return installed;
  }

  const generateIconsPath = `${projectFolder}/generate-icons.js`;
  const originGenerateIconsPath = `${getOriginPath()}/ui/generate-icons.js`;

  if (!existsSync(generateIconsPath) && existsSync(originGenerateIconsPath)) {
    cpSync(originGenerateIconsPath, generateIconsPath);
  }

  if (existsSync(generateIconsPath)) {
    await runCommand('node generate-icons.js', {
      cwd: projectFolder,
      verbose: false,
      loaderText: 'Generating icon classes',
    });
  }

  // Toolbar utilities live in icons.css; wire the import like installCss does for theme sheets.
  if (existsSync(`${projectFolder}/src/theme/icons.css`)) {
    ensureStylesImport(projectFolder, 'icons');
  }

  return installed;
}
