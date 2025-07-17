import { HttpResourceRef } from '@angular/common/http';
import {
  computed,
  Directive,
  effect,
  inject,
  input,
  signal,
  Type,
} from '@angular/core';
import { GetManyResult } from '../models/get-many-result';
import { QueryPagination } from '../models/query-pagination';
import { HttpBase } from './http-base';

@Directive()
export abstract class ListBase<
  QueryType extends QueryPagination,
  TEntity = any
> {
  protected readonly resourceRef: HttpResourceRef<
    GetManyResult<TEntity> | undefined
  >;
  protected readonly limitPage = signal(30);
  protected readonly page = signal(1);
  protected readonly filter = signal<QueryType>({} as any);
  protected readonly resource: HttpBase<TEntity, any, QueryType>;
  protected readonly totalItemsOnPage = signal(0);
  protected readonly totalItems = signal(0);
  protected readonly list = signal<TEntity[]>([]);

  queryParams = computed<QueryType>(
    () =>
      ({
        page: this.page(),
        limit: this.limitPage(),
        ...this.filter(),
      } as QueryType)
  );
  reload = input<boolean>(false);

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    resource: Type<HttpBase<TEntity, any, QueryType>>,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    protected readonly componentFilter?: Type<any>
  ) {
    this.resource = inject(resource);
    this.resourceRef = this.resource.getManyWithResource(this.queryParams);

    effect(() => {
      const result = this.resourceRef.value();

      if (!result) {
        return;
      }

      this.list.set(result.items);
      this.totalItemsOnPage.set(result.items.length);
      this.totalItems.set(result.count);
    });

    effect(() => {
      if (this.reload()) {
        this.reloadList();
      }
    });
  }

  protected reloadList() {
    this.resourceRef.reload();
  }
}
