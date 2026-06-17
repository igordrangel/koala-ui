import { computed, Directive, effect, input, ResourceRef, signal } from '@angular/core';
import { OrderBy } from '../components/table/ordered-header-col';

export interface DatalistResponse<TDataItem> {
  items: TDataItem[];
  count: number;
}

@Directive()
export abstract class ListBase<TDataItem = any, TFilterPayload = Record<string, any>> {
  protected readonly currentPage = signal<number | null>(1);
  protected readonly pageSize = signal<number | null>(30);
  protected readonly totalItems = signal<number | null>(0);
  protected readonly orderedBy = signal<OrderBy | null>(null);
  protected readonly filter = signal<TFilterPayload | null>(null);

  protected readonly skeletonItems = computed(() => Array.from({ length: 10 }));
  protected readonly defaultList: DatalistResponse<TDataItem> = { items: [], count: 0 };

  protected get filterParams() {
    return {
      filter: this.filter() || ({} as TFilterPayload),
      page: this.currentPage() ?? 1,
      pageSize: this.pageSize() ?? 10,
      sortBy: this.orderedBy()?.field,
      order: this.orderedBy()?.direction,
    };
  }

  protected abstract readonly datalist: ResourceRef<DatalistResponse<TDataItem>>;

  readonly reload = input<boolean>(false);

  constructor() {
    effect(() => {
      if (this.reload()) {
        this.datalist.reload();
      }
    });
  }

  reloadList() {
    this.datalist.reload();
  }
}
