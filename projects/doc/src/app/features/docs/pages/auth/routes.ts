import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'configuration',
    loadComponent: () =>
      import('./pages/configuration/auth-configuration.page').then(
        (c) => c.AuthConfigurationPage
      ),
  },
  {
    path: 'authentication',
    loadComponent: () =>
      import('./pages/authentication/authentication.page').then(
        (c) => c.AuthenticationPage
      ),
  },
  {
    path: 'authorization',
    loadComponent: () =>
      import('./pages/authorization/authorization.page').then(
        (c) => c.AuthorizationPage
      ),
  },
];
