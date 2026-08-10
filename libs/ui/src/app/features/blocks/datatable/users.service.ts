import { HttpBase } from '@/shared/base/http.base';
import { DatalistResponse } from '@/shared/base/list.base';
import { Injectable } from '@angular/core';
import { KlArray } from '@koalarx/utils/KlArray';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  eyeColor: string;
}

interface UsersQueryParams {
  page?: number | null;
  limit?: number | null;
  orderBy?: string;
  direction?: string;
  name?: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService extends HttpBase {
  constructor() {
    super('https://dummyjson.com', 'users');
  }

  getMany(queryParams: UsersQueryParams): Observable<DatalistResponse<User>> {
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
