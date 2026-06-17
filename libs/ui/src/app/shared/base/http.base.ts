import { HttpClient } from '@angular/common/http';
import { inject, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { first } from 'rxjs/internal/operators/first';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { downloadBufferFile } from '../utils/download-buffer-file';
import { mimeTypeByExtension } from '../utils/mime-type-by-extension';

interface ResourceOptions<TParams = any, TData = any, TResult = any> {
  mapFn?: (data: TData) => TResult;
  queryParams?: TParams;
  defaultValue?: TResult;
}

interface ResourceOptionsWithMapFn<
  TParams = any,
  TData = any,
  TResult = any,
> extends ResourceOptions<TParams, TData, TResult> {
  mapFn: (data: TData) => TResult;
}

export abstract class HttpBase {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl: string;
  protected readonly endpoint: string;

  constructor(baseUrl: string, endpoint: string) {
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;
  }

  protected url(resourcePath?: string): string {
    return resourcePath
      ? `${this.baseUrl}/${this.endpoint}/${resourcePath}`
      : `${this.baseUrl}/${this.endpoint}`;
  }

  protected get(queryParams?: Record<string, any>, resourcePath?: string) {
    return this.http.get(this.url(resourcePath), { params: queryParams });
  }

  protected post(data: any, resourcePath?: string) {
    return this.http.post(this.url(resourcePath), data);
  }

  protected put(data: any, resourcePath?: string) {
    return this.http.put(this.url(resourcePath), data);
  }

  protected patch(data: any, resourcePath?: string) {
    return this.http.patch(this.url(resourcePath), data);
  }

  protected delete(resourcePath?: string) {
    return this.http.delete(this.url(resourcePath));
  }

  protected getFile(queryParams?: Record<string, any>, resourcePath?: string) {
    return this.http
      .get<Buffer>(this.url(resourcePath), {
        headers: {
          'Content-Type': 'application/json',
        },
        params: queryParams,
        responseType: 'arraybuffer' as 'json',
      })
      .pipe(first());
  }

  protected downloadFile(
    filename: string,
    resourcePath?: string,
    queryParams?: Record<string, any>,
  ) {
    this.getFile(queryParams, resourcePath)
      .pipe(
        tap({
          next: (response) =>
            downloadBufferFile(response as any, mimeTypeByExtension(filename), filename),
        }),
      )
      .subscribe();
  }

  protected resource<TParams = any, TData = any, TResult = any>(
    options: Omit<ResourceOptions<TParams, TData, TResult>, 'mapFn'>,
    resourcePath?: string,
  ): ResourceRef<TData>;
  protected resource<TParams = any, TData = any, TResult = any>(
    options: ResourceOptionsWithMapFn<TParams, TData, TResult>,
    resourcePath?: string,
  ): ResourceRef<TResult>;
  protected resource<TParams = any, TData = any, TResult = any>(
    options?: ResourceOptions<TParams, TData, TResult>,
    resourcePath?: string,
  ) {
    const params = options?.queryParams ?? ({} as TParams);
    const mapFn = options?.mapFn;
    const defaultValue = options?.defaultValue ?? undefined;

    return rxResource({
      defaultValue,
      params: () => params,
      stream: ({ params }) =>
        this.http
          .get<TData>(this.url(resourcePath), { params: { ...params } as any })
          .pipe(map((response: TData) => (mapFn ? mapFn(response) : response))),
    });
  }
}
