import { computed, Directive, effect, inject, input, resource, signal, Type } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OrderBy } from '../components/table/ordered-header-col';
import { fromObservableWithSignal } from '../utils/from-observable-with-signal';
import { isMobile } from '../utils/is-mobile';
import { HttpBase } from './http.base';

export interface DatalistResponse<TDataItem> {
  items: TDataItem[];
  count: number;
}

interface ListService<TDataItem> extends HttpBase {
  getMany(queryParams: any): Observable<DatalistResponse<TDataItem>>;
}

@Directive()
export abstract class ListBase<TDataItem = any, TListService = ListService<TDataItem>> {
  protected readonly service: TListService;
  protected readonly currentPage = signal<number | null>(1);
  protected readonly pageSize = signal<number | null>(30);
  protected readonly totalItems = signal<number | null>(0);
  protected readonly orderedBy = signal<OrderBy | null>(null);
  protected readonly filter = signal<Record<string, any> | null>(null);

  protected readonly skeletonItems = computed(() => Array.from({ length: 10 }));
  protected readonly defaultList: DatalistResponse<TDataItem> = { items: [], count: 0 };

  protected readonly isMobile = isMobile();

  protected get filterPayload() {
    return this.filter.asReadonly();
  }

  protected get filterParams() {
    return {
      filter: this.filterPayload() ?? {},
      page: this.currentPage(),
      pageSize: this.pageSize(),
      sortBy: this.orderedBy()?.field,
      order: this.orderedBy()?.direction,
    };
  }

  protected readonly datalist = resource({
    params: () => this.filterParams,
    defaultValue: this.defaultList,
    loader: async ({ params, abortSignal }) => {
      const http$ = (this.service as ListService<TDataItem>).getMany({
        page: params.page,
        limit: params.pageSize,
        ...(params.sortBy ? { orderBy: params.sortBy, direction: params.order } : {}),
        ...params.filter,
      });

      const response = await fromObservableWithSignal(http$, abortSignal);
      this.totalItems.set(response.count);
      return response;
    },
  });

  readonly reload = input<boolean>(false);

  constructor(service: Type<TListService>) {
    this.service = inject(service);
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
