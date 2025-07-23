import { effect, Injectable, signal } from '@angular/core';

export interface FilterData {
  templateValue: string;
  propName: string;
  value: any;
}

@Injectable()
export class DatatableFilter {
  private readonly _payload = signal<Record<string, any>>({});
  private readonly _filters = signal<FilterData[]>([]);
  private readonly _clearFilter = signal<boolean>(false);

  constructor() {
    effect(() => {
      const filters = this._filters();

      filters.forEach((filter) => {
        this._payload.update((current) => {
          return {
            ...current,
            [filter.propName]: filter.value,
          };
        });
      });
    });
  }

  get payload() {
    return this._payload.asReadonly();
  }

  get filters() {
    return this._filters.asReadonly();
  }

  get clearFilter() {
    return this._clearFilter.asReadonly();
  }

  setFilters(filters: FilterData[]) {
    this._filters.set(filters);
  }

  removeFilter(propName: string) {
    this._filters.update((current) => {
      return current.filter((filter) => filter.propName !== propName);
    });
  }

  clearFilters() {
    this._filters.set([]);
    this._payload.set({});

    this._clearFilter.set(true);
    setTimeout(() => this._clearFilter.set(false));
  }
}
