```typescript
import {
  QueryPagination,
  QueryPaginationDirection,
} from '@koalarx/ui/core/models';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
    country: string;
  };
}

export interface PersonListResult {
  limit: number;
  skip: number;
  total: number;
  users: Person[];
}

export interface PersonFilterData extends QueryPagination {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface QueryPerson {
  q?: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: QueryPaginationDirection;
}
```
