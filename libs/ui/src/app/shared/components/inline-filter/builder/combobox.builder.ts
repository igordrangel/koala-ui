import { ComboboxOptions } from '../../combobox';
import { BuilderBase } from './builder.base';

export class ComboboxBuilder extends BuilderBase {
  options(options: ComboboxOptions<any, any>) {
    this.config.options = options;
    return this;
  }
}
