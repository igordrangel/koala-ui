```typescript
import { ListBase } from '@/core/base/list-base';
import { QueryUsersRequest } from '@/features/users/models/query-users.request';
import { User } from '@/features/users/models/user';
import { UserService } from '@/features/users/services/user.service';
import { Datatable } from '@koalarx/ui/shared/components/datatable';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.html',
  imports: [Datatable],
})
export class UsersList extends ListBase<QueryUsersRequest, User> {
  constructor() {
    super(UserService, UserFilter);
  }
}
```
