import { ValidatorFn } from '@angular/forms';
import { InlineFilterField, InlineFilterFieldType } from '../config';
import { signal } from '@angular/core';

export abstract class BuilderBase {
  protected config = {} as InlineFilterField;

  constructor(label: string, name: string, validators?: ValidatorFn | ValidatorFn[]) {
    this.config.label = label;
    this.config.name = name;
    this.config.validators = validators;
  }

  type(type: InlineFilterFieldType) {
    this.config.type = type;
    return this;
  }

  hint(hint?: string) {
    this.config.hint = hint;
    return this;
  }

  defaultValue(value?: any) {
    this.config.defaultValue = value;
    return this;
  }

  build() {
    this.config.templateValue = signal('');
    this.config.value = signal(null);
    this.config.invalid = signal(false);
    this.config.loading = signal(false);

    return this.config;
  }
}
