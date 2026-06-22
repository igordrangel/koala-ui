```typescript
import { Component } from '@angular/core';
import { PageBase } from '@/shared/base/page.base';
import { Breadcrumb } from '@/shared/components/breadcrumb';

@Component({
  selector: 'app-users-page',
  template: `
    <app-breadcrumb [items]="breadcrumbs()" />
    <app-users-list [reload]="reload()" />
  `,
  imports: [Breadcrumb, UsersList],
})
export class UsersPage extends PageBase {
  onSaved() {
    this.reloadList();
  }
}
```
