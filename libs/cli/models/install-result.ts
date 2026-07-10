import { InstallBaseFlags } from '../utils/install-base';
import { InstallComponentFlags } from '../utils/install-component';
import { InstallCoreResourceFlags } from '../utils/install-core-resource';
import { InstallDirectiveFlags } from '../utils/install-directive';
import { InstallUtilFlags } from '../utils/install-util';
import { InstallValidatorFlags } from '../utils/install-validator';

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
