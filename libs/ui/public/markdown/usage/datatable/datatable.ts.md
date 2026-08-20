```typescript
import { Component, inject } from '@angular/core';
import { Service } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { KlArray } from '@koalarx/utils/KlArray';
import { DatalistResponse, ListBase } from '@/shared/base/list.base';
import { HttpBase } from '@/shared/base/http.base';
import { Button } from '@/shared/components/button';
import { InlineFilter, InlineFilterBuilder } from '@/shared/components/inline-filter';
import { Loading } from '@/shared/components/loading';
import { Pagination } from '@/shared/components/pagination';
import { Skeleton } from '@/shared/components/skeleton';
import { Table } from '@/shared/components/table';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  eyeColor: string;
}

@Service()
export class UsersService extends HttpBase {
  constructor() {
    super('https://dummyjson.com', 'users');
  }

  getMany(queryParams: {
    page?: number | null;
    limit?: number | null;
    orderBy?: string;
    direction?: string;
    name?: string;
    email?: string;
  }): Observable<DatalistResponse<User>> {
    const page = queryParams.page ?? 1;
    const pageSize = queryParams.limit ?? 30;
    const sortBy = queryParams.orderBy ?? 'firstName';
    const order = queryParams.direction ?? 'asc';

    return this.get({ limit: 300, sortBy, order }).pipe(
      map((data) => {
        const { users: rawUsers } = data as { users: User[] };
        const users = new KlArray<User>(
          rawUsers.filter((item) => {
            const nameFilter = queryParams.name;
            const emailFilter = queryParams.email;

            return (
              (!nameFilter ||
                item.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
                item.lastName.toLowerCase().includes(nameFilter.toLowerCase())) &&
              (!emailFilter || item.email.toLowerCase() === emailFilter.toLowerCase())
            );
          }),
        );

        const count = users.length;
        const items = users.split(pageSize)[page - 1] ?? [];

        return { items: [...items], count };
      }),
    );
  }
}

@Component({
  selector: 'app-datatable-sample',
  templateUrl: './datatable-sample.html',
  imports: [InlineFilter, Table, Pagination, Skeleton, Button, Loading],
  providers: [InlineFilterBuilder],
})
export class DatatableSample extends ListBase<User, UsersService> {
  readonly filterConfig = inject(InlineFilterBuilder)
    .input('Name', 'name')
    .input('Email', 'email', 'email')
    .build();

  constructor() {
    super(UsersService);

    this.orderedBy.set({ field: 'firstName', direction: 'asc' });
  }
}
```
