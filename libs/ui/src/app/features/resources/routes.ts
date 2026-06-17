import { generateTitle } from '@/core/utils/generate-title';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'list-base',
    loadComponent: () => import('./list-base/list-base.page').then((m) => m.ListBasePage),
    title: generateTitle('List Base'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then((m) => m.AuthPage),
    title: generateTitle('Auth'),
  },
];
