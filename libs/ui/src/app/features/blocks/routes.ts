import { generateTitle } from '@/core/utils/generate-title';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'datatable',
    loadComponent: () => import('./datatable/datatable.page').then((m) => m.DatatablePage),
    title: generateTitle('Datatable'),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    title: generateTitle('Login'),
  },
];
