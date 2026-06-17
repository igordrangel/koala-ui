export function getProjectPath(projectName: string): string {
  if (process.cwd().includes(projectName)) {
    return process.cwd();
  }

  return `${process.cwd()}/${projectName}`;
}
