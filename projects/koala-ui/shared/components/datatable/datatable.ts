import {
  booleanAttribute,
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
import { Tooltip } from '@koalarx/ui/shared/directives';
import { FilterData } from './filter/datatable-filter';
import { Filter } from './filter/filter';

@Component({
  selector: 'kl-datatable',
  templateUrl: './datatable.html',
  imports: [FormsModule, Filter, Tooltip],
})
export class Datatable {
  private readonly sideWindow = inject(SideWindow);

  readonly translations = inject(AppConfig).translation.datatable;

  currentPage = input.required<number>();
  totalItems = input.required<number>();
  totalItemsOnPage = input.required<number>();
  currentPageSize = input.required<number>();
  isLoading = input.required();
  colspan = input.required<number>();
  componentFilter = input<Type<any>>();
  withPaginator = input(false, { transform: booleanAttribute });
  filter = signal<FilterData[]>([]);
  pageSize = model<number>(0);
  pageSizes = [10, 20, 30, 50, 100];

  skeletonRows = computed(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  skeletonCols = computed(() => {
    return Array.from({ length: this.colspan() }, (_, i) => i);
  });

  paginator = computed(() => {
    const isLoading = this.isLoading();
    const paginator: number[] = [];

    if (!isLoading) {
      const firstPage = 1;
      const previousPage = this.currentPage() - 1;
      const currentPage = this.currentPage();
      const nextPage = this.currentPage() + 1;
      const lastPage = Math.ceil(this.totalItems() / this.currentPageSize());

      if (firstPage < currentPage) {
        paginator.push(firstPage);
      }

      if (previousPage > firstPage) {
        paginator.push(previousPage);
      }

      paginator.push(currentPage);

      if (nextPage < lastPage) {
        paginator.push(nextPage);
      }

      if (lastPage > currentPage) {
        paginator.push(lastPage);
      }
    }

    return paginator;
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
