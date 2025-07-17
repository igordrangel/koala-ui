```typescript
import { PageBase } from '@koalarx/ui/core/base/page-base';
import { SideWindow } from '@koalarx/ui/shared/components/side-window';
import { Button } from '@koalarx/ui/shared/directives';
import { Component, inject } from '@angular/core';
import { UsersList } from '../../components/manage-users/list/users-list';
import { UserPersistForm } from '../../components/manage-users/persist-form/user-persist-form';

@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users.page.html',
  imports: [Button, UsersList],
})
export class ManageUsersPage extends PageBase {
  private readonly sideWindow = inject(SideWindow);

  add() {
    this.sideWindow.open(UserPersistForm, {
      afterClosed: {
        trigger: 'reloadList',
        callback: () => this.reloadList(),
      },
    });
  }
}
```
