import { WritableSignal } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { ComboboxOptions } from '../combobox';
import { SelectOptions } from '../select';

export type InlineFilterFieldType = 'input' | 'calendar' | 'select' | 'combobox';
export type InlineFilterInputType =
  | 'text'
  | 'number'
  | 'email'
  | 'tel'
  | 'url'
  | 'cpf'
  | 'cnpj'
  | 'currency';

export interface InlineFilterField {
  label: string;
  name: string;
  type: InlineFilterFieldType;
  inputType?: InlineFilterInputType;
  options?: SelectOptions<any, any> | ComboboxOptions<any, any>;
  hint?: string;
  placeholder?: string;
  validators?: ValidatorFn | ValidatorFn[];
  multiple?: boolean;
  defaultValue?: any;
  editing?: boolean;
  templateValue: WritableSignal<string>;
  value: WritableSignal<any>;
  invalid: WritableSignal<boolean>;
  loading: WritableSignal<boolean>;
}

export interface InlineFilterConfig {
  fields: InlineFilterField[];
}
