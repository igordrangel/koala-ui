type AngularProject = {
  projectType?: string;
  prefix?: string;
};

type AngularJson = {
  defaultProject?: string;
  projects?: Record<string, AngularProject>;
};

/**
 * Resolves an angular.json project key from a candidate name (CLI --project or cwd basename).
 * Falls back to defaultProject, then the first application, then the first project key.
 */
export function resolveAngularProjectName(
  angularJson: AngularJson,
  projectName: string,
): string | null {
  const projects = angularJson.projects ?? {};

  if (projects[projectName]) {
    return projectName;
  }

  if (angularJson.defaultProject && projects[angularJson.defaultProject]) {
    return angularJson.defaultProject;
  }

  const application = Object.entries(projects).find(
    ([, project]) => project?.projectType === 'application',
  );
  if (application) {
    return application[0];
  }

  return Object.keys(projects)[0] ?? null;
}
