import { Component, effect, inject, input, output } from '@angular/core';
import { Tooltip } from '@koalarx/ui/shared/directives';
import { DatatableFilter, FilterData } from './datatable-filter';
import { AppConfig } from '@koalarx/ui/core/config';

@Component({
  selector: 'kl-filter',
  templateUrl: './filter.html',
  providers: [DatatableFilter],
  imports: [Tooltip],
})
export class Filter {
  readonly translations = AppConfig.translation.datatable;

  datatableFilter = inject(DatatableFilter);
  filter = input<FilterData[]>([]);
  payload = output<Record<string, any>>();
  addFilter = output<FilterData[]>();

  constructor() {
    effect(() => this.datatableFilter.setFilters(this.filter()));
    effect(() => this.payload.emit(this.datatableFilter.payload()));
  }

  add() {
    this.addFilter.emit(this.datatableFilter.filters());
  }
}
