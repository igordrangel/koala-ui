```typescript
import { Injectable } from '@angular/core';
import { HttpBase } from '@/shared/base/http.base';
import { environment } from '@/environments/environment';

interface User {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService extends HttpBase {
  constructor() {
    super(environment.apiUrl, 'users');
  }

  readonly users = this.resource<User[]>({
    defaultValue: [],
  });

  create(user: Omit<User, 'id'>) {
    return this.post(user);
  }
}
```
