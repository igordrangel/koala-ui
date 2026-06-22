import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { KlArray } from '@koalarx/utils/KlArray';
import { filter, map, startWith } from 'rxjs';

interface MenuOption {
  name: string;
  routerLink: string;
  commingSoon?: boolean;
}

interface MenuOptions {
  name: string;
  items: MenuOption[];
}

type ModulePage = 'getting-started' | 'components' | 'blocks' | 'resources';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.html',
  imports: [RouterLink, RouterLinkActive],
})
export class NavMenu {
  private readonly router = inject(Router);

  private readonly currentPage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => location.hash.split('/').slice(1)),
      startWith(this.router.url.split('/').filter(Boolean)),
    ),
  );
  readonly currentModulePage = computed<ModulePage | null>(() => {
    const url = this.currentPage()?.[0];
    if (
      url === 'getting-started' ||
      url === 'components' ||
      url === 'blocks' ||
      url === 'resources'
    ) {
      return url;
    }
    return null;
  });

  readonly gettingStarted = new KlArray<MenuOption>([
    { name: 'Introduction', routerLink: 'getting-started/introduction' },
    { name: 'Installation', routerLink: 'getting-started/installation' },
  ]).orderBy('name');

  readonly components = new KlArray<MenuOptions>([
    {
      name: 'Actions',
      items: new KlArray<MenuOption>([
        { name: 'Button', routerLink: 'components/button' },
        { name: 'Confirm', routerLink: 'components/confirm' },
        { name: 'Dropdown', routerLink: 'components/dropdown' },
        { name: 'Modal', routerLink: 'components/modal' },
        { name: 'Side Window', routerLink: 'components/side-window' },
        { name: 'Bottom Sheet', routerLink: 'components/bottom-sheet' },
      ]).orderBy('name'),
    },
    {
      name: 'Data Display',
      items: new KlArray<MenuOption>([
        { name: 'Collapse', routerLink: 'components/collapse' },
        { name: 'Table', routerLink: 'components/table' },
      ]).orderBy('name'),
    },
    {
      name: 'Navigation',
      items: new KlArray<MenuOption>([
        { name: 'Breadcrumb', routerLink: 'components/breadcrumb' },
        { name: 'Stepper', routerLink: 'components/stepper' },
        { name: 'Tab', routerLink: 'components/tabs' },
        { name: 'Pagination', routerLink: 'components/pagination' },
      ]).orderBy('name'),
    },
    {
      name: 'Feedback',
      items: new KlArray<MenuOption>([
        { name: 'Alert', routerLink: 'components/alert' },
        { name: 'Loading', routerLink: 'components/loading' },
        { name: 'Toast', routerLink: 'components/toast' },
        { name: 'Tooltip', routerLink: 'components/tooltip' },
        { name: 'Skeleton', routerLink: 'components/skeleton' },
      ]).orderBy('name'),
    },
    {
      name: 'Data Input',
      items: new KlArray<MenuOption>([
        { name: 'CNPJ', routerLink: 'components/input-cnpj' },
        { name: 'CPF', routerLink: 'components/input-cpf' },
        { name: 'Checkbox', routerLink: 'components/checkbox' },
        { name: 'Currency', routerLink: 'components/input-currency' },
        { name: 'Calendar', routerLink: 'components/calendar' },
        { name: 'Radio', routerLink: 'components/radio' },
        { name: 'Range', routerLink: 'components/range' },
        { name: 'Select', routerLink: 'components/select' },
        { name: 'Combobox', routerLink: 'components/combobox' },
        { name: 'Toggle', routerLink: 'components/toggle' },
        { name: 'Textarea', routerLink: 'components/textarea' },
        { name: 'Inline Filter', routerLink: 'components/inline-filter' },
        { name: 'Input Field', routerLink: 'components/input-field' },
        { name: 'Validator', routerLink: 'components/validator' },
        { name: 'Fieldset', routerLink: 'components/fieldset' },
      ]).orderBy('name'),
    },
  ]).orderBy('name');

  readonly blocks = new KlArray<MenuOption>([
    { name: 'Datatable', routerLink: 'blocks/datatable' },
    { name: 'Login', routerLink: 'blocks/login' },
  ]).orderBy('name');

  readonly resources = new KlArray<MenuOptions>([
    {
      name: 'Abstractions',
      items: new KlArray<MenuOption>([
        { name: 'HttpBase', routerLink: 'resources/http-base' },
        { name: 'ListBase', routerLink: 'resources/list-base' },
        { name: 'PageBase', routerLink: 'resources/page-base' },
      ]).orderBy('name'),
    },
    {
      name: 'Others',
      items: new KlArray<MenuOption>([
        { name: 'Global Errors', routerLink: 'resources/global-errors' },
      ]).orderBy('name'),
    },
    {
      name: 'Security & Policies',
      items: new KlArray<MenuOption>([
        { name: 'Auth', routerLink: 'resources/auth' },
        { name: 'Rules', routerLink: 'resources/rules' },
      ]).orderBy('name'),
    },
  ]).orderBy('name');
}
