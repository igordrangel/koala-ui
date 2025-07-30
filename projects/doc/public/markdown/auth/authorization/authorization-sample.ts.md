```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@koalarx/ui/shared/directives';
import { Authorization } from '@koalarx/ui/shared/services';

interface User {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-authorization-sample',
  templateUrl: './authorization-sample.html',
  imports: [Button],
})
export class AuthorizationSample {
  private readonly authorization = inject<Authorization<User>>(Authorization);

  userInfo = this.authorization.userinfo;

  logout() {
    this.authorization.logout();
  }
}
```
