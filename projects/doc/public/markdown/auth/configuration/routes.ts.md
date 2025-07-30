```typescript
import { Routes } from '@angular/router';
import { AuthGuard } from '@koalarx/ui/core/guards';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home.page').then(
        (c) => c.HomePage
      ),
    canActivate: [AuthGuard],
  },
];
```
