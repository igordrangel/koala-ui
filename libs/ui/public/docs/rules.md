# Rules

## Installation

```bash
kl install auth
```

Rules (route permissions) is installed together with Auth. It includes `RouteAccessGuard`, `routesRegistre`, and `LoggedUser`.

### TypeScript

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

### Overview

Rules provides route-level permission control. Routes registered with a `rule` are protected by `RouteAccessGuard`, which checks the logged user's permissions.

## API

### Types

- **RouteRule**: Permission identifier. Redefine in `logged-user.ts` (e.g. `'admin' | 'user'`).
- **RouteConfig**: Route definition with optional `rule`, `name`, and `iconClass`.
- **RouteData**: Data attached to protected routes (`name`, `rule`, `iconClass`, `parent`).

### Function

- **routesRegistre(routes)**: Registers routes, applies `RouteAccessGuard` when `rule` is set, and populates `ROUTES_CONFIG`.

### Guard

- **RouteAccessGuard**: Redirects to login when there is no token; otherwise waits for authentication and checks `LoggedUser.hasPermission(rule)`.

### Model

- **LoggedUser.hasPermission(rule)**: Returns `true` when the user has the required rule(s). Undefined rule allows access.

## Usage

See the [Auth](./auth.md) resource and [Login Block](./login.md) for a full authentication flow.
