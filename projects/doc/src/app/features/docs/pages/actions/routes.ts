import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button/button.page').then((c) => c.ButtonPage),
  },
];
