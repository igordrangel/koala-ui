import { Injectable } from '@angular/core';
import { ComboboxOptions } from '../../combobox';
import { SelectOptions } from '../../select';
import { InlineFilterConfig, InlineFilterInputType } from '../config';
import { CalendarBuilder } from './calendar.builder';
import { ComboboxBuilder } from './combobox.builder';
import { InputBuilder } from './input.builder';
import { SelectBuilder } from './select.builder';
import { CommonOptions, SelectFieldConfig } from './types';

@Injectable()
export class InlineFilterBuilder {
  private readonly config = {
    fields: [],
  } as InlineFilterConfig;

  input(
    label: string,
    name: string,
    type: InlineFilterInputType = 'text',
    fieldOptions?: CommonOptions,
  ) {
    this.config.fields.push(
      new InputBuilder(label, name, fieldOptions?.validators)
        .type('input')
        .inputType(type)
        .placeholder(fieldOptions?.placeholder)
        .hint(fieldOptions?.hint)
        .defaultValue(fieldOptions?.defaultValue)
        .build(),
    );

    return this;
  }

  select<T extends SelectOptions>(
    label: string,
    name: string,
    options: T,
    fieldOptions: SelectFieldConfig<T, true>,
  ): this;
  select<T extends SelectOptions>(
    label: string,
    name: string,
    options: T,
    fieldOptions?: SelectFieldConfig<T, false>,
  ): this;
  select<T extends SelectOptions>(
    label: string,
    name: string,
    options: T,
    fieldOptions?: SelectFieldConfig<T, boolean>,
  ) {
    this.config.fields.push(
      new SelectBuilder(label, name, fieldOptions?.validators)
        .type('select')
        .options(options)
        .multiple(fieldOptions?.multiple)
        .hint(fieldOptions?.hint)
        .defaultValue(fieldOptions?.defaultValue)
        .build(),
    );

    return this;
  }

  combobox(
    label: string,
    name: string,
    options: ComboboxOptions<any, any>,
    fieldOptions?: CommonOptions,
  ) {
    this.config.fields.push(
      new ComboboxBuilder(label, name, fieldOptions?.validators)
        .type('combobox')
        .options(options)
        .hint(fieldOptions?.hint)
        .defaultValue(fieldOptions?.defaultValue)
        .build(),
    );

    return this;
  }

  calendar(label: string, name: string, fieldOptions?: CommonOptions) {
    this.config.fields.push(
      new CalendarBuilder(label, name, fieldOptions?.validators)
        .type('calendar')
        .placeholder(fieldOptions?.placeholder)
        .defaultValue(fieldOptions?.defaultValue)
        .build(),
    );

    return this;
  }

  build() {
    return this.config;
  }
}
