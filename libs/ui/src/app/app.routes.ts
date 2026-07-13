import { Routes } from '@angular/router';
import { localeGuard } from './core/i18n/locale.guard';
import { localeMatcher } from './core/i18n/locale.matcher';
import { DEFAULT_LOCALE, isLocale } from './core/i18n/locale.types';
import { generateTitle } from './core/utils/generate-title';
import { HomePage } from './features/home/home.page';

const localeChildren: Routes = [
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
  {
    path: '**',
    redirectTo: '',
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: DEFAULT_LOCALE,
    pathMatch: 'full',
  },
  {
    matcher: localeMatcher,
    canActivate: [localeGuard],
    children: localeChildren,
  },
  {
    path: '**',
    redirectTo: ({ url }) => {
      const parts = url.map((segment) => segment.path).filter(Boolean);
      if (!parts.length) {
        return `/${DEFAULT_LOCALE}`;
      }
      // Unknown path under a locale should fall back to that locale home (never /pt/pt/...).
      if (isLocale(parts[0])) {
        return `/${parts[0]}`;
      }
      // Legacy URLs without locale → default locale.
      return `/${DEFAULT_LOCALE}/${parts.join('/')}`;
    },
  },
];
