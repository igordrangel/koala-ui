import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { getProjectPath } from './project-path';
import { setupGlobalTests } from './setup-global-tests';

type E2ERoute = {
  path: string;
  hostFile: string;
  importPath: string;
  componentName: string;
};

const E2E_ROUTES: E2ERoute[] = [
  {
    path: 'e2e/select',
    hostFile: 'src/app/shared/components/select/testing/select-e2e-host.ts',
    importPath: '../shared/components/select/testing/select-e2e-host',
    componentName: 'SelectE2EHostComponent',
  },
  {
    path: 'e2e/combobox',
    hostFile: 'src/app/shared/components/combobox/testing/combobox-e2e-host.ts',
    importPath: '../shared/components/combobox/testing/combobox-e2e-host',
    componentName: 'ComboboxE2EHostComponent',
  },
  {
    path: 'e2e/filter',
    hostFile: 'src/app/shared/components/filter/testing/filter-e2e-host.ts',
    importPath: '../shared/components/filter/testing/filter-e2e-host',
    componentName: 'FilterE2EHostComponent',
  },
];

const E2E_MAIN_CONTENT = `import { bootstrapApplication } from '@angular/platform-browser';
import { e2eAppConfig } from './app/testing/e2e.config';
import { E2EApp } from './app/testing/e2e.app';

bootstrapApplication(E2EApp, e2eAppConfig).catch((err) => console.error(err));
`;

const E2E_APP_CONTENT = `import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './e2e.app.html',
  imports: [RouterOutlet],
})
export class E2EApp {}
`;

const E2E_APP_HTML_CONTENT = `<router-outlet />
`;

const E2E_CONFIG_CONTENT = `import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { e2eRoutes } from './e2e.routes';

export const e2eAppConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(e2eRoutes, withHashLocation())],
};
`;

function removeLegacyE2ERoutesFromApp(projectPath: string): void {
  const appRoutesPath = `${projectPath}/src/app/app.routes.ts`;

  if (!existsSync(appRoutesPath)) {
    return;
  }

  const appRoutesContent = readFileSync(appRoutesPath, 'utf-8');

  const withoutLegacyRoutes = E2E_ROUTES.reduce((content, route) => {
    const routeRegex = new RegExp(
      `\\s*\\{\\s*path:\\s*'${route.path.replace('/', '\\/')}',[\\s\\S]*?\\},?\\n?`,
      'g',
    );

    return content.replace(routeRegex, '\n');
  }, appRoutesContent)
    .replace(/,\s*\]/g, ']')
    .replace(/\[\s*\n\s*\]/g, '[]')
    .replace(/\n{3,}/g, '\n\n');

  if (withoutLegacyRoutes !== appRoutesContent) {
    writeFileSync(appRoutesPath, withoutLegacyRoutes, 'utf-8');
  }
}

function buildRoutesFileContent(routes: E2ERoute[]): string {
  const routesBlock = routes
    .map((route) => {
      return [
        '  {',
        `    path: '${route.path}',`,
        '    loadComponent: () =>',
        `      import('${route.importPath}').then((m) => m.${route.componentName}),`,
        '  }',
      ].join('\n');
    })
    .join(',\n');

  return `import { Routes } from '@angular/router';

export const e2eRoutes: Routes = [
${routesBlock}
];
`;
}

function ensureAngularE2EConfiguration(projectPath: string, projectName: string): void {
  const angularJsonPath = `${projectPath}/angular.json`;

  if (!existsSync(angularJsonPath)) {
    return;
  }

  const angularJson = JSON.parse(readFileSync(angularJsonPath, 'utf-8')) as {
    projects?: Record<string, any>;
  };

  const projects = angularJson.projects ?? {};
  const resolvedProjectName = projects[projectName] ? projectName : Object.keys(projects)[0];

  if (!resolvedProjectName) {
    return;
  }

  const project = projects[resolvedProjectName] as { architect?: Record<string, any> };
  project.architect ??= {};
  project.architect.build ??= { options: {}, configurations: {} };
  project.architect.serve ??= { configurations: {} };

  const buildTarget = project.architect.build as {
    configurations?: Record<string, any>;
  };

  buildTarget.configurations ??= {};
  buildTarget.configurations.e2e = {
    ...(buildTarget.configurations.development ?? {}),
    browser: 'src/e2e.main.ts',
  };

  const serveTarget = project.architect.serve as {
    configurations?: Record<string, any>;
  };

  serveTarget.configurations ??= {};
  serveTarget.configurations.e2e = {
    buildTarget: `${resolvedProjectName}:build:e2e`,
  };

  writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
}

function ensureE2EApp(projectName: string): void {
  const projectPath = getProjectPath(projectName);
  removeLegacyE2ERoutesFromApp(projectPath);

  const routesToInclude = E2E_ROUTES.filter((route) => {
    const hostPath = `${projectPath}/${route.hostFile}`;
    return existsSync(hostPath);
  });

  if (routesToInclude.length === 0) {
    return;
  }

  const e2eMainPath = `${projectPath}/src/e2e.main.ts`;
  const e2eAppPath = `${projectPath}/src/app/testing/e2e.app.ts`;
  const e2eAppHtmlPath = `${projectPath}/src/app/testing/e2e.app.html`;
  const e2eConfigPath = `${projectPath}/src/app/testing/e2e.config.ts`;
  const e2eRoutesPath = `${projectPath}/src/app/testing/e2e.routes.ts`;

  mkdirSync(`${projectPath}/src/app/testing`, { recursive: true });

  writeFileSync(e2eMainPath, E2E_MAIN_CONTENT, 'utf-8');
  writeFileSync(e2eAppPath, E2E_APP_CONTENT, 'utf-8');
  writeFileSync(e2eAppHtmlPath, E2E_APP_HTML_CONTENT, 'utf-8');
  writeFileSync(e2eConfigPath, E2E_CONFIG_CONTENT, 'utf-8');
  writeFileSync(e2eRoutesPath, buildRoutesFileContent(routesToInclude), 'utf-8');

  ensureAngularE2EConfiguration(projectPath, projectName);
}

export async function setupComponentTests(projectName: string): Promise<void> {
  await setupGlobalTests(projectName);
  ensureE2EApp(projectName);
}
