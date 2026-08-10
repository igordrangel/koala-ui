ListBase is an abstraction for datatable lists. It wires pagination, sorting, filters, and a `resource` that loads data through an injected HTTP service with `getMany`.

## Contract

The service passed to `super(MyService)` must extend [HttpBase](./http-base.md) and implement:

```typescript
getMany(queryParams: any): Observable<DatalistResponse<TDataItem>>;
```

`ListBase` calls `getMany` with:

- `page`, `limit` (from `pageSize`)
- `orderBy`, `direction` when sorting is set
- spread filter fields from the `filter` signal

The response shape is `{ items: TDataItem[]; count: number }`. `count` updates `totalItems` for pagination.

## API

### Generics

- **TDataItem**: Row/item type.
- **TListService**: Service type (defaults to a `HttpBase` with `getMany`).

### Constructor

- **service**: `Type<TListService>` — injected and used by the built-in `datalist` loader.

### Attributes

- **currentPage**: Signal with the current page number.
- **pageSize**: Signal with items per page (default `30`).
- **totalItems**: Signal with the total item count (set from `getMany` `count`).
- **orderedBy**: Signal with the current sort (`field` / `direction`).
- **filter**: Signal with the applied filter object.
- **filterPayload**: Readonly view of `filter`.
- **filterParams**: Params object used by the `datalist` resource (`filter`, `page`, `pageSize`, `sortBy`, `order`).
- **skeletonItems**: Computed placeholder list for loading UI.
- **defaultList**: Empty `{ items: [], count: 0 }` default for the resource.
- **datalist**: Built-in `resource` that loads via `service.getMany`.
- **isMobile**: `true` when `window.innerWidth < 768` at construction.
- **reload**: Input signal; when `true`, triggers `datalist.reload()`.

### Methods

- **reloadList**: Reloads the datalist resource.

## Usage

See the [Datatable](./datatable.md) block for a full table + filter + pagination example.
