import { HttpResourceRef } from '@angular/common/http';
import {
  computed,
  Directive,
  effect,
  inject,
  input,
  linkedSignal,
  model,
  signal,
  Type,
} from '@angular/core';
import {
  GetManyResult,
  QueryPagination,
  SortFilterType,
} from '@koalarx/ui/core/models';
import { DatatableConfig } from '@koalarx/ui/shared/components/datatable';
import { HttpBase } from './http-base';

type PaginationType = 'paginator' | 'loadMore';

@Directive()
export abstract class ListBase<
  QueryType extends QueryPagination,
  TEntity = any,
  TService extends HttpBase<TEntity, any, QueryType> = HttpBase<
    TEntity,
    any,
    QueryType
  >,
> {
  private reloading = false;
  private currentPaginationType: PaginationType = 'paginator';
  protected readonly resourceRef: HttpResourceRef<
    GetManyResult<TEntity> | undefined
  >;
  protected readonly limitPage = signal(30);
  protected readonly page = signal(1);
  protected readonly filter = signal<QueryType>({} as any);
  protected readonly service: TService;
  protected readonly totalItemsOnPage = signal(0);
  protected readonly totalItems = signal(0);
  protected readonly list = signal<TEntity[]>([]);
  protected readonly sortFilter = signal<SortFilterType | null>(null);
  protected readonly paginationType = model<PaginationType>('paginator');
  protected readonly withPagination = computed<boolean>(() => {
    this.currentPaginationType = this.paginationType();
    return this.currentPaginationType === 'paginator';
  });
  protected readonly datatableConfig = linkedSignal(
    () =>
      ({
        currentPage: this.page(),
        totalItems: this.totalItems(),
        totalItemsOnPage: this.totalItemsOnPage(),
        currentPageSize: this.limitPage(),
        isLoading: this.resourceRef.isLoading(),
        hasError: !!this.resourceRef.error(),
      }) as DatatableConfig,
  );

  queryParams = computed<QueryType>(
    () =>
      ({
        page: this.page(),
        limit: this.limitPage(),
        ...(this.sortFilter() ?? {}),
        ...this.filter(),
      }) as QueryType,
  );
  reload = input<boolean>(false);

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    service: Type<TService>,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    protected readonly componentFilter?: Type<any>,
  ) {
    this.service = inject(service);
    this.resourceRef = this.service.getManyWithResource(this.queryParams);

    effect(() => {
      this.filter();
      this.page.set(1);
    });

    effect(() => {
      const queryParams = this.queryParams();

      if (queryParams.page === 1 && !this.reloading) {
        this.reloading = true;
        return;
      }
    });

    effect(() => {
      const withPagination = this.currentPaginationType === 'paginator';
      const result = this.resourceRef.value();

      if (!withPagination && !this.reloading) {
        if (result) {
          this.list.update((current) => [...current, ...result.items]);
          this.totalItemsOnPage.update(
            (current) => current + result.items.length,
          );
          this.totalItems.set(result.count);
        }
        this.reloading = false;
        return;
      }

      if (!result) {
        this.list.set([]);
        this.totalItemsOnPage.set(0);
        this.totalItems.set(0);
        this.reloading = false;
        return;
      }

      this.list.set(result.items);
      this.totalItemsOnPage.set(result.items.length);
      this.totalItems.set(result.count);
      this.reloading = false;
    });

    effect(() => {
      if (this.reload()) {
        this.reloadList();
      }
    });
  }

  protected sort(sortFilter: SortFilterType) {
    this.sortFilter.set(sortFilter);
  }

  protected reloadList() {
    this.reloading = true;
    this.list.set([]);
    this.totalItemsOnPage.set(0);
    this.totalItems.set(0);
    this.page.set(1);
    this.resourceRef.reload();
  }

  protected loadMore() {
    this.page.update((current) => current + 1);
  }
}
