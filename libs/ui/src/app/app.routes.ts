import { Routes } from '@angular/router';
import { HomePage } from './features/home/home.page';
import { generateTitle } from './core/utils/generate-title';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: generateTitle('The Next Level for Your Angular Projects'),
  },
  {
    path: 'getting-started',
    redirectTo: 'getting-started/introduction',
    pathMatch: 'full',
  },
  {
    path: 'components',
    redirectTo: 'components/button',
    pathMatch: 'full',
  },
  {
    path: 'blocks',
    redirectTo: 'blocks/datatable',
    pathMatch: 'full',
  },
  {
    path: 'resources',
    redirectTo: 'resources/list-base',
    pathMatch: 'full',
  },
  {
    path: 'getting-started',
    loadChildren: () => import('./features/getting-started/routes').then((m) => m.ROUTES),
  },
  {
    path: 'components',
    loadChildren: () => import('./features/components/routes').then((m) => m.ROUTES),
  },
  {
    path: 'blocks',
    loadChildren: () => import('./features/blocks/routes').then((m) => m.ROUTES),
  },
  {
    path: 'resources',
    loadChildren: () => import('./features/resources/routes').then((m) => m.ROUTES),
  },
];
