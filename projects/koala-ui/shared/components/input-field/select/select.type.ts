import { ResourceRef, Signal } from '@angular/core';

export interface SelectDataOptionsFnParams {
  filter?: string | null;
  currentValue?: any | null;
  internalFilter?: string | null;
}

export type SelectValue = string | number | boolean | null;
export interface SelectOption<TData = any> {
  label: string;
  value: SelectValue;
  data?: TData;
}
export type SelectList<TData = any> = SelectOption<TData>[];
export type SelectDataOptionsFn = (
  data: Signal<SelectDataOptionsFnParams>
) => ResourceRef<SelectList>;

export type SelectDataOptions =
  | SelectDataOptionsFn
  | ResourceRef<SelectList>
  | Signal<SelectList>
  | SelectList;

export interface OptionsResource {
  onDemand?: ResourceRef<SelectList>;
  onServer?: ResourceRef<SelectList>;
  inMemory?: SelectList;
  inMemoryWithLoading?: Signal<SelectList>;
}
