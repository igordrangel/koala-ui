import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injector, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AutocompleteOption } from '@koalarx/ui/shared/components/input-field/autocomplete';
import { first } from 'rxjs/internal/operators/first';
import { map } from 'rxjs/internal/operators/map';
import { AppConfig } from '../config';
import { GetManyResult } from '../models/get-many-result';
import { SelectOption } from '@koalarx/ui/shared/components/input-field/select';

export interface HttpResourceRequestOptions<EntityType> {
  debounceTime?: number;
  endpoint?: string;
  mapOption?: (
    item: EntityType
  ) => Omit<AutocompleteOption<EntityType> | SelectOption<EntityType>, 'data'>;
}

export abstract class HttpBase<
  EntityType = any,
  PayloadType = any,
  QueryType = any
> {
  protected readonly injector = inject(Injector);
  protected readonly http = inject(HttpClient);
  protected readonly hostApi = AppConfig.hostApi;
  protected readonly url: string;

  constructor(protected readonly resource: string) {
    this.url = `${this.hostApi}/${this.resource}`;
  }

  post<T>(data: PayloadType, endpoint = '') {
    return this.http.post<T>(`${this.url}${endpoint}`, data).pipe(first());
  }

  put<T>(id: string, data: PayloadType) {
    return this.http.put<T>(`${this.url}/${id}`, data).pipe(first());
  }

  patch<T>(id: string, data: any) {
    return this.http.patch<T>(`${this.url}/${id}`, data).pipe(first());
  }

  delete<T>(id: string) {
    return this.http.delete<T>(`${this.url}/${id}`).pipe(first());
  }

  getMany<TResponse = EntityType>(query: QueryType, endpoint = '') {
    return this.http.get<GetManyResult<TResponse>>(`${this.url}${endpoint}`, {
      params: query as any,
    });
  }

  getById<TResponse = EntityType>(id: string | null) {
    return this.http.get<TResponse>(`${this.url}/${id}`);
  }

  getManyWithResource<TResponse = EntityType>(
    query: Signal<QueryType>,
    {
      endpoint = '',
      mapOption,
    }: Omit<HttpResourceRequestOptions<TResponse>, 'debounceTime'> = {}
  ) {
    return httpResource<GetManyResult<TResponse>>(
      () => {
        return {
          url: `${this.url}${endpoint}`,
          params: query() as any,
        };
      },
      {
        parse: mapOption as (data: any) => any,
      }
    );
  }

  getByIdWithResource<TResponse = EntityType>(
    id: Signal<string | null>,
    endpoint = ':id',
    mapResponse?: (response: TResponse) => TResponse
  ) {
    return httpResource<TResponse>(
      () => {
        const resourceId = id();

        if (!resourceId) {
          return undefined;
        }

        return `${this.url}/${endpoint.replace(':id', resourceId)}`;
      },
      {
        parse: mapResponse as (resume: any) => TResponse,
      }
    );
  }

  getByOneWithResource<TResponse = EntityType>(
    endpoint: Signal<string | null>,
    params?: Signal<any>,
    mapResponse?: (response: TResponse) => TResponse
  ) {
    return httpResource<TResponse>(
      () => {
        const resourceUrl = endpoint();

        if (!resourceUrl) {
          return undefined;
        }

        return {
          url: `${this.url}/${resourceUrl}`,
          params: params ? params() : undefined,
        };
      },
      {
        parse: mapResponse as (resume: any) => TResponse,
      }
    );
  }

  getManyForSelector<TResponse = EntityType>(
    query: QueryType | Signal<QueryType>,
    mapOption: (
      item: TResponse
    ) => Omit<AutocompleteOption<TResponse> | SelectOption<TResponse>, 'data'>
  ) {
    return rxResource({
      defaultValue: [],
      params: () => (query instanceof Function ? query() : query),
      stream: (data) =>
        this.getMany<TResponse>(data.params).pipe(
          map((response) =>
            response.items.map(
              (item) =>
                ({
                  ...mapOption(item),
                  data: item,
                } as AutocompleteOption<TResponse>)
            )
          )
        ),
    });
  }
}
