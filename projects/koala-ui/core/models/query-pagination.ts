export type QueryPaginationDirection = 'asc' | 'desc';

export interface QueryPagination {
  page?: number;
  limit?: number;
  orderBy?: string;
  direction?: QueryPaginationDirection;
}
