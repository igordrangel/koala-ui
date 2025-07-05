import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'autocomplete',
    loadComponent: () =>
      import('./pages/autocomplete/autocomplete.page').then(
        (c) => c.AutocompletePage
      ),
  },
];
