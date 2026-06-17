import { cpSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getProjectPath } from './project-path';

const originPath = path.join(__dirname, '../../');

export const InstallCoreResourceFlagsList = [
  'constants/security-storage-keys',
  'guards/route-access.guard',
  'interceptors/authorization-interceptor',
  'security/authorization.service',
  'models/credentials',
  'models/logged-user',
  'utils/authentication',
  'utils/routes-registre',
] as const;
export type InstallCoreResourceFlags = (typeof InstallCoreResourceFlagsList)[number];

function includeOnAppConfig(projectName: string, resource: InstallCoreResourceFlags) {
  const projectFolder = getProjectPath(projectName);
  const appConfigPath = path.join(projectFolder, 'src/app/app.config.ts');

  let appConfigContent = readFileSync(appConfigPath, 'utf-8');
  const providers: string[] = [];
  const imports: string[] = [];

  switch (resource) {
    case 'interceptors/authorization-interceptor':
      providers.push(
        '{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }',
      );
      imports.push(
        `import { HTTP_INTERCEPTORS } from '@angular/common/http';`,
        `import { AuthorizationInterceptor } from './core/interceptors/authorization-interceptor';`,
      );
      break;
  }

  imports.forEach((importLine) => {
    if (!appConfigContent.includes(importLine)) {
      appConfigContent = importLine + '\n' + appConfigContent;
    }
  });

  const providersArrayRegex = /(providers\s*:\s*\[)([\s\S]*?)(\])/m;
  const match = appConfigContent.match(providersArrayRegex);
  if (match) {
    let currentProviders = match[2];
    providers.forEach((provider) => {
      if (!currentProviders.includes(provider)) {
        // Adiciona antes do fechamento do array
        currentProviders = currentProviders.trim();
        if (currentProviders.length > 0 && !currentProviders.endsWith(',')) {
          currentProviders += ',';
        }
        currentProviders += `\n    ${provider}`;
      }
    });
    appConfigContent = appConfigContent.replace(providersArrayRegex, `$1${currentProviders}$3`);
  }

  writeFileSync(appConfigPath, appConfigContent, 'utf-8');
}

export function installCoreResource(projectName: string, resource: InstallCoreResourceFlags) {
  const projectFolder = getProjectPath(projectName);
  const coreResourceFolderPath = `${projectFolder}/src/app/core/${resource}`;
  const coreResourceOriginPath = `${originPath}/ui/core/${resource}`;

  cpSync(`${coreResourceOriginPath}.ts`, `${coreResourceFolderPath}.ts`);

  switch (resource) {
    case 'constants/security-storage-keys':
      const fileContent = readFileSync(`${coreResourceOriginPath}.ts`, 'utf-8');
      writeFileSync(
        `${coreResourceFolderPath}.ts`,
        fileContent.replace(/koala/g, projectName),
        'utf-8',
      );
      break;
    case 'interceptors/authorization-interceptor':
      includeOnAppConfig(projectName, resource);
      break;
  }
}
