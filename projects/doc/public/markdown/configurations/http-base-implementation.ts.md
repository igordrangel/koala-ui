```typescript
import { HttpBase } from '@koalarx/ui/core/base';
import { computed, Injectable, Signal } from '@angular/core';
import { QueryUsersRequest } from '../models/query-users.request';
import { User } from '../models/user';
import { UserRequest } from '../models/user.request';

@Injectable({ providedIn: 'root' })
export class UserService extends HttpBase<
  User,
  UserRequest,
  QueryUsersRequest
> {
  constructor() {
    super('user');
  }
  ...
}
```
