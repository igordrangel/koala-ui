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
];
