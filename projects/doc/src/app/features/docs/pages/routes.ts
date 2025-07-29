import { Routes } from '@angular/router';
import { InstallationPage } from './installation/installation.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'installation' },
  { path: 'installation', component: InstallationPage },
  {
    path: 'introduction',
    loadComponent: () =>
      import('./introduction/introduction.page').then(
        (c) => c.IntroductionPage
      ),
  },
  {
    path: 'theming',
    loadComponent: () =>
      import('./theming/theming.page').then((c) => c.ThemingPage),
  },
  {
    path: 'configurations',
    loadComponent: () =>
      import('./configurations/configurations.page').then(
        (c) => c.ConfigurationsPage
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/routes').then((c) => c.routes),
  },
  {
    path: 'actions',
    loadChildren: () => import('./actions/routes').then((c) => c.routes),
  },
  {
    path: 'data-display',
    loadChildren: () => import('./data-display/routes').then((c) => c.routes),
  },
  {
    path: 'navigation',
    loadChildren: () => import('./navigation/routes').then((c) => c.routes),
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/routes').then((c) => c.routes),
  },
  {
    path: 'data-input',
    loadChildren: () => import('./data-input/routes').then((c) => c.routes),
  },
];
