```typescript
// logged-user.ts — redefine RouteRule for your app
export type RouteRule = 'admin' | 'user' | 'reports';

// app.routes.ts
import { routesRegistre } from './core/utils/routes-registre';
import { UsersPage } from './features/users/users.page';

export const routes = routesRegistre([
  {
    path: 'users',
    name: 'Users',
    iconClass: 'fa-users',
    rule: 'admin',
    component: UsersPage,
  },
]);
```

The guard reads `rule` from route data and calls `loggedUser.hasPermission(rule)`.
