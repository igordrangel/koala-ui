import { generateTitle } from '@/core/utils/generate-title';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'generate-icons',
    loadComponent: () =>
      import('./generate-icons/generate-icons.page').then((m) => m.GenerateIconsPage),
    title: generateTitle('Generate Icons'),
  },
];
