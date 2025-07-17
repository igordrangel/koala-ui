import { Injectable } from '@angular/core';
import { FilterData } from './datatable-filter';

@Injectable()
export class FilterFactory {
  private readonly _filter: FilterData[] = [];

  get filter() {
    return [...this._filter];
  }

  setFilters<T>(
    filter: T,
    templateNameFn: (propName: keyof typeof filter, value: any) => string
  ) {
    const filterData = filter as Record<string, any>;

    Object.keys(filterData).forEach((propName) => {
      const value = filterData[propName];

      if (value === null || value === undefined || value === '') {
        return;
      }

      const templateValue = templateNameFn(propName as any, value);
      this.addFilter({ templateValue, propName, value });
    });

    return this._filter;
  }

  addFilter(filter: FilterData) {
    this._filter.push(filter);
  }

  toPayload(data: FilterData[]): Record<string, any> {
    return data.reduce((acc, curr) => {
      acc[curr.propName] = curr.value;
      return acc;
    }, {} as Record<string, any>);
  }
}
