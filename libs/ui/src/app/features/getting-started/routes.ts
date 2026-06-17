import { generateTitle } from '@/core/utils/generate-title';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'introduction',
    loadComponent: () => import('./introduction/introduction.page').then((m) => m.IntroductionPage),
    title: generateTitle('Introduction'),
  },
  {
    path: 'installation',
    loadComponent: () => import('./installation/installation.page').then((m) => m.InstallationPage),
    title: generateTitle('Installation'),
  },
];
