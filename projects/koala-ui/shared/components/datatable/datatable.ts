import {
  booleanAttribute,
  ChangeDetectionStrategy,
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
import { AppConfig } from '@koalarx/ui/core/config';
import { SideWindow } from '@koalarx/ui/shared/components/side-window';
import { Button, ButtonColor } from '@koalarx/ui/shared/directives';
import { DatatableConfig } from './datatable-config';
import { FilterData } from './filter/datatable-filter';
import { Filter } from './filter/filter';

@Component({
  selector: 'kl-datatable',
  templateUrl: './datatable.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Filter, Button],
})
export class Datatable {
  private readonly sideWindow = inject(SideWindow);

  readonly translations = inject(AppConfig).translation.datatable;

  config = input.required<DatatableConfig>();
  colspan = input.required<number>();
  loadMoreBtnColor = input<ButtonColor>('accent');
  filterBtnColor = input<ButtonColor>('primary');
  componentFilter = input<Type<any>>();
  withPaginator = input(false, { transform: booleanAttribute });

  currentPage = computed(() => this.config().currentPage);
  totalItems = computed(() => this.config().totalItems);
  totalItemsOnPage = computed(() => this.config().totalItemsOnPage);
  currentPageSize = computed(() => this.config().currentPageSize);
  isLoading = computed(() => this.config().isLoading);
  hasError = computed(() => this.config().hasError);

  filter = signal<FilterData[]>([]);
  hasFilter = computed(() => {
    return this.filter().length > 0;
  });
  pageSize = model<number>(0);
  pageSizes = [10, 20, 30, 50, 100];

  skeletonRows = computed(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  skeletonCols = computed(() => {
    return Array.from({ length: this.colspan() }, (_, i) => i);
  });

  lastPage = computed(() => {
    const isLoading = this.isLoading();

    if (!isLoading) {
      return Math.ceil(this.totalItems() / this.currentPageSize());
    }

    return 1;
  });

  pageChange = output<number>();
  pageSizeChange = output<number>();
  filterChange = output<Record<string, any>>();
  reloadList = output<void>();
  loadMore = output<void>();

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
