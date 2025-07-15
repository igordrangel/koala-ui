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
    path: 'data-input',
    loadChildren: () => import('./data-input/routes').then((c) => c.routes),
  },
  {
    path: 'actions',
    loadChildren: () => import('./actions/routes').then((c) => c.routes),
  },
];
