import { ResourceRef } from '@angular/core';

export interface SelectOption<TValue = any, TData = undefined> {
  label: string;
  description?: string;
  value: TValue;
  data?: TData;
}

export interface ListConfig {
  onMemory: SelectOption[];
  resourceRef: ResourceRef<SelectOption[]>;
}

export type SelectOptions<TValue = any, TData = undefined> =
  | SelectOption<TValue, TData>[]
  | ResourceRef<SelectOption<TValue, TData>[]>;
