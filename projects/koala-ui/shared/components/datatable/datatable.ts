import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  Type,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SideWindow } from '@koalarx/ui/shared/components/side-window';
import { Tooltip } from '@koalarx/ui/shared/directives';
import { FilterData } from './filter/datatable-filter';
import { Filter } from './filter/filter';
import { AppConfig } from '@koalarx/ui/core/config';

@Component({
  selector: 'kl-datatable',
  templateUrl: './datatable.html',
  imports: [FormsModule, Filter, Tooltip],
})
export class Datatable {
  private readonly sideWindow = inject(SideWindow);

  readonly translations = AppConfig.translation.datatable;

  currentPage = input.required<number>();
  totalItems = input.required<number>();
  totalItemsOnPage = input.required<number>();
  currentPageSize = input.required<number>();
  isLoading = input.required();
  colspan = input.required<number>();
  componentFilter = input<Type<any>>();
  filter = signal<FilterData[]>([]);
  pageSize = model<number>(0);
  pageSizes = [10, 20, 30, 50, 100];

  skeletonRows = computed(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  skeletonCols = computed(() => {
    return Array.from({ length: this.colspan() }, (_, i) => i);
  });

  pageChange = output<number>();
  pageSizeChange = output<number>();
  filterChange = output<Record<string, any>>();
  reloadList = output<void>();

  constructor() {
    effect(() => this.pageSize.set(this.currentPageSize()));
    effect(() => this.pageSizeChange.emit(this.pageSize()));
    effect(() => this.pageChange.emit(this.currentPage()));
  }

  openFilter(data?: FilterData[]) {
    const component = this.componentFilter();

    if (!component) {
      return;
    }

    this.sideWindow.open(component, {
      data,
      afterClosed: {
        trigger: [],
        callback: (filters: FilterData[]) => this.filter.set(filters),
      },
    });
  }
}
