import { Routes } from '@angular/router';
import { routes as docRoutes } from './features/docs/pages/routes';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'docs/installation' },
  { path: 'docs', children: docRoutes },
];
