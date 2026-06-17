import { Injector, ResourceRef, Signal } from '@angular/core';

export interface ComboboxOption<TValue = any, TData = undefined> {
  label: string;
  description?: string;
  value: TValue;
  data?: TData;
}

export interface ListConfig {
  onMemory: ComboboxOption[];
  resourceRef: ResourceRef<ComboboxOption[]>;
  async: AsyncComboboxOptions;
}

export type AsyncComboboxOptions<TValue = any, TData = undefined> = (
  filter: Signal<string>,
  selectedValues: Signal<TValue[]>,
  injector: Injector,
) => ResourceRef<ComboboxOption<TValue, TData>[]>;

export type ComboboxOptions<TValue = any, TData = undefined> =
  | ComboboxOption<TValue, TData>[]
  | ResourceRef<ComboboxOption<TValue, TData>[]>
  | AsyncComboboxOptions<TValue, TData>;
