import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'autocomplete',
    loadComponent: () =>
      import('./pages/autocomplete/autocomplete.page').then(
        (c) => c.AutocompletePage
      ),
  },
  {
    path: 'input-text',
    loadComponent: () =>
      import('./pages/input-text/input-text.page').then((c) => c.InputTextPage),
  },
];
