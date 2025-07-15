import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'stepper',
    loadComponent: () =>
      import('./pages/stepper/stepper.page').then((c) => c.StepperPage),
  },
];
