import type { InstallBaseFlags } from '../utils/install-base';
import type { InstallComponentFlags } from '../utils/install-component';
import type { InstallCoreResourceFlags } from '../utils/install-core-resource';
import type { InstallDirectiveFlags } from '../utils/install-directive';
import type { InstallUtilFlags } from '../utils/install-util';
import type { InstallValidatorFlags } from '../utils/install-validator';

export interface InstallResult {
  components: InstallComponentFlags[];
  validators: InstallValidatorFlags[];
  directives: InstallDirectiveFlags[];
  utils: InstallUtilFlags[];
  base: InstallBaseFlags[];
  coreResources: InstallCoreResourceFlags[];
  libs: string[];
  css: string[];
  icons: string[];
  missingLibs: string[];
}
