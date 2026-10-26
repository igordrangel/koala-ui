import path from 'node:path';

export function getProjectPath(projectName: string): string {
  if (process.cwd().includes(projectName)) {
    return process.cwd();
  }

  return `${process.cwd()}/${projectName}`;
}

/** Folder basename of cwd — cross-platform (Windows paths use `\`). */
export function getDefaultProjectName(): string {
  return path.basename(process.cwd());
}
