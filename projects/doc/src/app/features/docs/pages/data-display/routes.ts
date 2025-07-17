import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'accordion',
    loadComponent: () =>
      import('./pages/accordion/accordion.page').then((c) => c.AccordionPage),
  },
  {
    path: 'collapse',
    loadComponent: () =>
      import('./pages/collapse/collapse.page').then((c) => c.CollapsePage),
  },
  {
    path: 'datatable',
    loadComponent: () =>
      import('./pages/datatable/datatable.page').then((c) => c.DatatablePage),
  },
];
