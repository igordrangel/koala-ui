import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { getProjectPath } from './project-path';
import { runCommand } from './run-command';

const originPath = path.join(__dirname, '../../');

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

  const icons =
    iconSet === 'text-editor-icons' ? TEXT_EDITOR_ICON_FILES : ([] as readonly string[]);

  for (const icon of icons) {
    const origin = `${originPath}/ui/assets/icons/${icon}.svg`;
    const target = `${targetFolder}/${icon}.svg`;

    if (existsSync(origin)) {
      cpSync(origin, target);
      installed.push(icon);
    }
  }

  const generateIconsPath = `${projectFolder}/generate-icons.js`;

  if (installed.length > 0 && existsSync(generateIconsPath)) {
    await runCommand('node generate-icons.js', {
      cwd: projectFolder,
      verbose: false,
      loaderText: 'Generating icon classes',
    });
  }

  return installed;
}
