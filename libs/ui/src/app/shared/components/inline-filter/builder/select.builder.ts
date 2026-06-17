import { ResourceRef } from '@angular/core';
import { SelectOption } from '../../select';
import { BuilderBase } from './builder.base';

export class SelectBuilder extends BuilderBase {
  options<TValue = any, TData = any>(
    options: SelectOption<TValue, TData>[] | ResourceRef<SelectOption<TValue, TData>[]>,
  ) {
    this.config.options = options;
    return this;
  }

  multiple(multiple?: boolean) {
    this.config.multiple = multiple ?? false;
    return this;
  }
}
