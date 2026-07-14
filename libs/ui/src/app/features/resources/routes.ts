import { generateTitle } from '@/core/utils/generate-title';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'list-base',
    loadComponent: () => import('./list-base/list-base.page').then((m) => m.ListBasePage),
    title: generateTitle('List Base'),
  },
  {
    path: 'http-base',
    loadComponent: () => import('./http-base/http-base.page').then((m) => m.HttpBasePage),
    title: generateTitle('Http Base'),
  },
  {
    path: 'page-base',
    loadComponent: () => import('./page-base/page-base.page').then((m) => m.PageBasePage),
    title: generateTitle('Page Base'),
  },
  {
    path: 'global-errors',
    loadComponent: () =>
      import('./global-errors/global-errors.page').then((m) => m.GlobalErrorsPage),
    title: generateTitle('Global Errors'),
  },
  {
    path: 'rules',
    loadComponent: () => import('./rules/rules.page').then((m) => m.RulesPage),
    title: generateTitle('Rules'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then((m) => m.AuthPage),
    title: generateTitle('Auth'),
  },
];
