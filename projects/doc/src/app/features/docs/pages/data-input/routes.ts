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
  {
    path: 'input-date',
    loadComponent: () =>
      import('./pages/input-date/input-date.page').then((c) => c.InputDatePage),
  },
  {
    path: 'input-datetime',
    loadComponent: () =>
      import('./pages/input-datetime/input-datetime.page').then(
        (c) => c.InputDatetimePage
      ),
  },
  {
    path: 'input-month',
    loadComponent: () =>
      import('./pages/input-month/input-month.page').then(
        (c) => c.InputMonthPage
      ),
  },
  {
    path: 'input-time',
    loadComponent: () =>
      import('./pages/input-time/input-time.page').then((c) => c.InputTimePage),
  },
];
