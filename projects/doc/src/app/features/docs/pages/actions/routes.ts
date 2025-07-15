import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button/button.page').then((c) => c.ButtonPage),
  },
  {
    path: 'dropdown',
    loadComponent: () =>
      import('./pages/dropdown/dropdown.page').then((c) => c.DropdownPage),
  },
  {
    path: 'dialog',
    loadComponent: () =>
      import('./pages/dialog/dialog.page').then((c) => c.DialogPage),
  },
  {
    path: 'side-window',
    loadComponent: () =>
      import('./pages/side-window/side-window.page').then(
        (c) => c.SideWindowPage
      ),
  },
];
