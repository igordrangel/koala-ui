import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'alert',
    loadComponent: () =>
      import('./pages/alert/alert.page').then((c) => c.AlertPage),
  },
  {
    path: 'loader',
    loadComponent: () =>
      import('./pages/loader/loader.page').then((c) => c.LoaderPage),
  },
  {
    path: 'snackbar',
    loadComponent: () =>
      import('./pages/snackbar/snackbar.page').then((c) => c.SnackbarPage),
  },
  {
    path: 'tooltip',
    loadComponent: () =>
      import('./pages/tooltip/tooltip.page').then((c) => c.TooltipPage),
  },
];
