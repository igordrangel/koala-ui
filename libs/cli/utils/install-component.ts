import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getOriginPath } from './get-package-root';
import { getPrefix } from './get-prefix';
import { getProjectPath } from './project-path';
import { getSharedRoot } from './get-shared-root';
import type { InstallValidatorFlags } from './install-validator';
import type { InstallDirectiveFlags } from './install-directive';
import type { InstallUtilFlags } from './install-util';
import type { InstallBaseFlags } from './install-base';
import type { InstallCoreResourceFlags } from './install-core-resource';
import type { InstallCssFlags } from './install-css';
import type { InstallIconSetFlags } from './install-icon';

export const InstallComponentFlagsList = [
  'button',
  'loading',
  'dropdown',
  'modal',
  'tabs',
  'tooltip',
  'stepper',
  'collapse',
  'confirm',
  'alert',
  'toast',
  'side-window',
  'table',
  'skeleton',
  'pagination',
  'breadcrumb',
  'fieldset',
  'validator',
  'input-field',
  'textarea',
  'calendar',
  'input-cpf',
  'input-cnpj',
  'input-currency',
  'currency',
  'checkbox',
  'radio',
  'toggle',
  'range',
  'select',
  'combobox',
  'inline-filter',
  'list-base',
  'http-base',
  'page-base',
  'global-errors',
  'auth',
  'bottom-sheet',
  'input-color',
  'text-editor',
] as const;
export type InstallComponentFlags = (typeof InstallComponentFlagsList)[number];

function configPrefix(componentFolderPath: string, prefix: string) {
  const files = readdirSync(componentFolderPath);

  for (const file of files) {
    const filePath = `${componentFolderPath}/${file}`;
    const stat = readdirSync(filePath, { withFileTypes: true });

    if (stat.some((s) => s.isDirectory())) {
      const subFiles = readdirSync(filePath);

      for (const subFile of subFiles) {
        const subFilePath = `${filePath}/${subFile}`;
        const subStat = readdirSync(subFilePath, { withFileTypes: true });

        if (subStat.some((s) => s.isDirectory())) {
          configPrefix(subFilePath, prefix);
        } else {
          const subFileTs = readFileSync(subFilePath, 'utf-8');
          writeFileSync(subFilePath, subFileTs.replace(/app/g, prefix), 'utf-8');
        }
      }
    } else {
      const fileTs = readFileSync(filePath, 'utf-8');
      writeFileSync(filePath, fileTs.replace(/app/g, prefix), 'utf-8');
    }
  }
}

export function installComponent(projectName: string, component: InstallComponentFlags) {
  const prefix = getPrefix(projectName);
  const projectFolder = getProjectPath(projectName);
  const sharedRoot = getSharedRoot(projectFolder);
  const componentFolderPath = `${sharedRoot}/components/${component}`;
  const componentOriginPath = `${getOriginPath()}/ui/components/${component}`;

  const componentDeps: InstallComponentFlags[] = [];
  const libDeps: string[] = [];
  const validatorDeps: InstallValidatorFlags[] = [];
  const directiveDeps: InstallDirectiveFlags[] = [];
  const utilDeps: InstallUtilFlags[] = [];
  const baseDeps: InstallBaseFlags[] = [];
  const coreResourceDeps: InstallCoreResourceFlags[] = [];
  const cssDeps: InstallCssFlags[] = [];
  const iconSetDeps: InstallIconSetFlags[] = [];

  switch (component) {
    case 'confirm':
    case 'alert':
      componentDeps.push('modal', 'button');
      break;
    case 'toast':
      componentDeps.push('button');
      cssDeps.push('toast');
      break;
    case 'calendar':
      libDeps.push('cally');
      componentDeps.push('input-field', 'dropdown');
      directiveDeps.push('mask');
      break;
    case 'input-cpf':
    case 'input-cnpj':
      if (component === 'input-cpf') {
        validatorDeps.push('cpf');
      } else {
        validatorDeps.push('cnpj');
      }

      directiveDeps.push('mask');
      utilDeps.push('string-mask');

      componentDeps.push('input-field');
      break;
    case 'currency':
      directiveDeps.push('currency');
      utilDeps.push('currency-mask');
      break;
    case 'combobox':
    case 'select':
      libDeps.push('@angular/aria');
      utilDeps.push(
        'scroll-into-view',
        'accessibility-select-options-on-keydown',
      );
      componentDeps.push('dropdown', 'input-field', 'loading');
      break;
    case 'inline-filter':
      utilDeps.push(
        'is-mobile',
        'scroll-into-view',
        'accessibility-select-options-on-keydown',
      );
      componentDeps.push(
        'combobox',
        'select',
        'button',
        'tooltip',
        'dropdown',
        'input-cpf',
        'input-cnpj',
        'currency',
        'calendar',
        'loading',
        'bottom-sheet',
      );
      break;
    case 'pagination':
      componentDeps.push('select');
      break;
    case 'list-base':
      baseDeps.push('list', 'http');
      utilDeps.push('is-mobile', 'from-observable-with-signal');
      componentDeps.push('table');
      break;
    case 'http-base':
      baseDeps.push('http');
      utilDeps.push('download-buffer-file', 'mime-type-by-extension');
      break;
    case 'page-base':
      baseDeps.push('page');
      utilDeps.push('make-breadcrumb');
      break;
    case 'global-errors':
      coreResourceDeps.push(
        'interceptors/feedback-request-interceptor',
        'middlewares/http-errors.midleware',
        'utils/http-error-feedback-alert',
        'utils/sanitize-error-message',
      );
      componentDeps.push('toast');
      break;
    case 'auth':
      libDeps.push('jwt-decode');
      coreResourceDeps.push(
        'constants/security-storage-keys',
        'guards/route-access.guard',
        'interceptors/authorization-interceptor',
        'security/authorization.service',
        'models/credentials',
        'models/logged-user',
        'utils/authentication',
        'utils/routes-registre',
      );
      break;
    case 'dropdown':
      utilDeps.push('is-mobile');
      break;
    case 'side-window':
      cssDeps.push('side-window');
      break;
    case 'table':
      cssDeps.push('table');
      break;
    case 'bottom-sheet':
      cssDeps.push('bottom-sheet');
      break;
    case 'modal':
      cssDeps.push('modal');
      break;
    case 'input-color':
      componentDeps.push('dropdown');
      break;
    case 'text-editor':
      libDeps.push(
        '@tiptap/starter-kit',
        '@tiptap/extension-table',
        '@tiptap/extension-highlight',
        '@tiptap/extension-image',
        '@tiptap/extension-text-align',
        '@tiptap/extension-file-handler',
        'ngx-tiptap',
      );
      componentDeps.push('dropdown', 'tooltip', 'input-color');
      cssDeps.push('editor');
      iconSetDeps.push('text-editor-icons');
      break;
  }

  if (existsSync(componentOriginPath)) {
    cpSync(componentOriginPath, componentFolderPath, {
      recursive: true,
    });

    if (prefix) {
      configPrefix(componentFolderPath, prefix);
    }
  }

  return {
    componentDeps,
    libDeps,
    validatorDeps,
    directiveDeps,
    utilDeps,
    baseDeps,
    coreResourceDeps,
    cssDeps,
    iconSetDeps,
  };
}
