export type QueryPaginationDirection = 'asc' | 'desc';

export interface SortFilterType {
  orderBy?: string;
  direction?: QueryPaginationDirection;
}

export interface QueryPagination extends SortFilterType {
  page?: number;
  limit?: number;
}
