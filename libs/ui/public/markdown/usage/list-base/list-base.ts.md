```typescript
import { Component } from '@angular/core';
import { Service } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { DatalistResponse, ListBase } from '@/shared/base/list.base';
import { HttpBase } from '@/shared/base/http.base';
import { environment } from '@/environments/environment';

interface User {
  id: string;
  name: string;
  email: string;
}

@Service()
export class UsersService extends HttpBase {
  constructor() {
    super(environment.apiUrl, 'users');
  }

  getMany(queryParams: Record<string, unknown>): Observable<DatalistResponse<User>> {
    return this.get(queryParams).pipe(map((response) => response as DatalistResponse<User>));
  }
}

@Component({
  selector: 'app-users-list',
  template: `
    <!-- bind currentPage, pageSize, totalItems, orderedBy, filter, datalist -->
  `,
})
export class UsersList extends ListBase<User, UsersService> {
  constructor() {
    super(UsersService);
  }
}
```
