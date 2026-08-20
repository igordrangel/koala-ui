import { cpSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getOriginPath } from './get-package-root';
import { getProjectPath } from './project-path';

export const InstallCoreResourceFlagsList = [
  'constants/security-storage-keys',
  'guards/route-access.guard',
  'interceptors/authorization-interceptor',
  'interceptors/feedback-request-interceptor',
  'middlewares/http-errors.midleware',
  'security/authorization.service',
  'models/credentials',
  'models/logged-user',
  'utils/authentication',
  'utils/routes-registre',
  'utils/http-error-feedback-alert',
  'utils/sanitize-error-message',
] as const;
export type InstallCoreResourceFlags = (typeof InstallCoreResourceFlagsList)[number];

const INTERCEPTOR_META = {
  'interceptors/authorization-interceptor': {
    symbol: 'authorizationInterceptor',
    importPath: './core/interceptors/authorization-interceptor',
  },
  'interceptors/feedback-request-interceptor': {
    symbol: 'feedbackRequestInterceptor',
    importPath: './core/interceptors/feedback-request-interceptor',
  },
} as const;

function ensureHttpClientImport(content: string): string {
  if (!content.includes("from '@angular/common/http'")) {
    return `import { provideHttpClient, withInterceptors } from '@angular/common/http';\n${content}`;
  }

  return content.replace(
    /import\s*\{([^}]*)\}\s*from\s*'@angular\/common\/http';/,
    (_match, inner: string) => {
      const parts = inner
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean);
      if (!parts.includes('provideHttpClient')) parts.push('provideHttpClient');
      if (!parts.includes('withInterceptors')) parts.push('withInterceptors');
      return `import { ${parts.join(', ')} } from '@angular/common/http';`;
    },
  );
}

function ensureInterceptorImport(content: string, symbol: string, importPath: string): string {
  if (content.includes(symbol) && content.includes(importPath)) {
    return content;
  }
  return `import { ${symbol} } from '${importPath}';\n${content}`;
}

function includeOnAppConfig(
  projectName: string,
  resource: keyof typeof INTERCEPTOR_META,
) {
  const projectFolder = getProjectPath(projectName);
  const appConfigPath = path.join(projectFolder, 'src/app/app.config.ts');
  let content = readFileSync(appConfigPath, 'utf-8');
  const { symbol, importPath } = INTERCEPTOR_META[resource];

  content = ensureHttpClientImport(content);
  content = ensureInterceptorImport(content, symbol, importPath);
  content = content.replace(
    /\{\s*provide:\s*HTTP_INTERCEPTORS,\s*useClass:\s*\w+,\s*multi:\s*true\s*\},?\s*/g,
    '',
  );

  if (/withInterceptors\s*\(\s*\[/.test(content)) {
    if (!new RegExp(`\\b${symbol}\\b`).test(content.match(/withInterceptors\s*\(\s*\[[^\]]*\]/)?.[0] ?? '')) {
      content = content.replace(/withInterceptors\s*\(\s*\[([^\]]*)\]/, (_m, inner: string) => {
        const trimmed = inner.trim().replace(/,$/, '');
        return `withInterceptors([${trimmed ? `${trimmed}, ${symbol}` : symbol}]`;
      });
    }
  } else if (/provideHttpClient\s*\(/.test(content)) {
    content = content.replace(/provideHttpClient\s*\(([^)]*)\)/, (_m, inner: string) => {
      const args = inner.trim();
      if (!args) {
        return `provideHttpClient(withInterceptors([${symbol}]))`;
      }
      return `provideHttpClient(${args}, withInterceptors([${symbol}]))`;
    });
  } else {
    content = content.replace(/(providers\s*:\s*\[)/, `$1\n    provideHttpClient(withInterceptors([${symbol}])),`);
  }

  writeFileSync(appConfigPath, content, 'utf-8');
}

export function installCoreResource(projectName: string, resource: InstallCoreResourceFlags) {
  const projectFolder = getProjectPath(projectName);
  const coreResourceFolderPath = `${projectFolder}/src/app/core/${resource}`;
  const coreResourceOriginPath = `${getOriginPath()}/ui/core/${resource}`;

  cpSync(`${coreResourceOriginPath}.ts`, `${coreResourceFolderPath}.ts`);

  switch (resource) {
    case 'constants/security-storage-keys': {
      const fileContent = readFileSync(`${coreResourceOriginPath}.ts`, 'utf-8');
      writeFileSync(
        `${coreResourceFolderPath}.ts`,
        fileContent.replace(/koala/g, projectName),
        'utf-8',
      );
      break;
    }
    case 'interceptors/authorization-interceptor':
    case 'interceptors/feedback-request-interceptor':
      includeOnAppConfig(projectName, resource);
      break;
  }
}
