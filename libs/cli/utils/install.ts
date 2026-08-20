import type { InstallResult } from '../models/install-result';
import { getNotInstalled } from './get-not-installed';
import { installBase } from './install-base';
import { installComponent } from './install-component';
import { installDirective } from './install-directive';
import { installLib } from './install-lib';
import { setupComponentTests } from './setup-component-tests';
import { installUtil } from './install-util';
import { installValidator } from './install-validator';
import { installCoreResource } from './install-core-resource';
import { installCss } from './install-css';
import { installIconSet } from './install-icon';
import type { InstallBaseFlags } from './install-base';
import type { InstallComponentFlags } from './install-component';
import type { InstallDirectiveFlags } from './install-directive';
import type { InstallUtilFlags } from './install-util';
import type { InstallValidatorFlags } from './install-validator';
import type { InstallCoreResourceFlags } from './install-core-resource';
import type { InstallCssFlags } from './install-css';
import type { InstallIconSetFlags } from './install-icon';

export async function install(
  projectName: string,
  component: InstallComponentFlags,
  verbose = false,
  silent = false,
): Promise<InstallResult> {
  const installedComponentDeps: InstallComponentFlags[] = [];
  const installedLibDeps: string[] = [];
  const missingLibDeps: string[] = [];
  const installedValidatorDeps: InstallValidatorFlags[] = [];
  const installedDirectiveDeps: InstallDirectiveFlags[] = [];
  const installedUtilDeps: InstallUtilFlags[] = [];
  const installedBaseDeps: InstallBaseFlags[] = [];
  const installedCoreResourceDeps: InstallCoreResourceFlags[] = [];
  const installedCssDeps: InstallCssFlags[] = [];
  const installedIconDeps: string[] = [];

  const deps = installComponent(projectName, component);

  for (const dep of getNotInstalled(projectName, 'lib', deps.libDeps)) {
    const installed = await installLib(projectName, dep, verbose, silent);

    if (installed) {
      installedLibDeps.push(dep);
    } else {
      missingLibDeps.push(dep);
    }
  }

  for (const dep of getNotInstalled(projectName, 'utils', deps.utilDeps)) {
    installUtil(projectName, dep);
    installedUtilDeps.push(dep);
  }

  for (const dep of getNotInstalled(projectName, 'validator', deps.validatorDeps)) {
    installValidator(projectName, dep);
    installedValidatorDeps.push(dep);
  }

  for (const dep of getNotInstalled(projectName, 'directives', deps.directiveDeps)) {
    installDirective(projectName, dep);
    installedDirectiveDeps.push(dep);
  }

  for (const dep of getNotInstalled(projectName, 'base', deps.baseDeps)) {
    installBase(projectName, dep);
    installedBaseDeps.push(dep);
  }

  for (const dep of getNotInstalled(projectName, 'core-resource', deps.coreResourceDeps)) {
    installCoreResource(projectName, dep);
    installedCoreResourceDeps.push(dep);
  }

  for (const dep of getNotInstalled(projectName, 'css', deps.cssDeps)) {
    installCss(projectName, dep);
    installedCssDeps.push(dep);
  }

  for (const iconSet of deps.iconSetDeps as InstallIconSetFlags[]) {
    const icons = await installIconSet(projectName, iconSet);
    installedIconDeps.push(...icons);
  }

  for (const component of getNotInstalled(projectName, 'component', deps.componentDeps)) {
    const result = await install(projectName, component, verbose, silent);
    installedComponentDeps.push(...result.components, component);
    installedLibDeps.push(...result.libs);
    installedUtilDeps.push(...result.utils);
    installedValidatorDeps.push(...result.validators);
    installedDirectiveDeps.push(...result.directives);
    installedBaseDeps.push(...result.base);
    installedCoreResourceDeps.push(...result.coreResources);
    installedIconDeps.push(...result.icons);
    missingLibDeps.push(...result.missingLibs);
  }

  await setupComponentTests(projectName);

  return {
    components: [...new Set(installedComponentDeps)],
    libs: [...new Set(installedLibDeps)],
    validators: [...new Set(installedValidatorDeps)],
    directives: [...new Set(installedDirectiveDeps)],
    utils: [...new Set(installedUtilDeps)],
    base: [...new Set(installedBaseDeps)],
    coreResources: [...new Set(installedCoreResourceDeps)],
    css: [...new Set(installedCssDeps)],
    icons: [...new Set(installedIconDeps)],
    missingLibs: [...new Set(missingLibDeps)],
  };
}
