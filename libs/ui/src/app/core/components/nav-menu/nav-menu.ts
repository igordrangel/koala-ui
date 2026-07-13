import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { KlArray } from '@koalarx/utils/KlArray';
import { filter, map, startWith } from 'rxjs';
import { LocalePathPipe } from '../../i18n/locale-path.pipe';
import { LocaleService } from '../../i18n/locale.service';
import { UI_COPY } from '../../i18n/ui-copy';

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
  imports: [RouterLink, RouterLinkActive, LocalePathPipe],
})
export class NavMenu {
  private readonly router = inject(Router);
  private readonly localeService = inject(LocaleService);

  private readonly currentPage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/)[0].split('/').filter(Boolean)),
      startWith(this.router.url.split(/[?#]/)[0].split('/').filter(Boolean)),
    ),
  );

  readonly currentModulePage = computed<ModulePage | null>(() => {
    const segments = this.currentPage() ?? [];
    const url = segments[0] === this.localeService.locale() ? segments[1] : segments[0];
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

  readonly gettingStarted = computed(() => {
    const copy = UI_COPY[this.localeService.locale()];
    return new KlArray<MenuOption>([
      { name: copy.introduction, routerLink: 'getting-started/introduction' },
      { name: copy.installation, routerLink: 'getting-started/installation' },
    ]).orderBy('name');
  });

  readonly components = computed(() => {
    const groups = UI_COPY[this.localeService.locale()].navGroups;
    return new KlArray<MenuOptions>([
      {
        name: groups.actions,
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
        name: groups.dataDisplay,
        items: new KlArray<MenuOption>([
          { name: 'Collapse', routerLink: 'components/collapse' },
          { name: 'Table', routerLink: 'components/table' },
        ]).orderBy('name'),
      },
      {
        name: groups.navigation,
        items: new KlArray<MenuOption>([
          { name: 'Breadcrumb', routerLink: 'components/breadcrumb' },
          { name: 'Stepper', routerLink: 'components/stepper' },
          { name: 'Tab', routerLink: 'components/tabs' },
          { name: 'Pagination', routerLink: 'components/pagination' },
        ]).orderBy('name'),
      },
      {
        name: groups.feedback,
        items: new KlArray<MenuOption>([
          { name: 'Alert', routerLink: 'components/alert' },
          { name: 'Loading', routerLink: 'components/loading' },
          { name: 'Toast', routerLink: 'components/toast' },
          { name: 'Tooltip', routerLink: 'components/tooltip' },
          { name: 'Skeleton', routerLink: 'components/skeleton' },
        ]).orderBy('name'),
      },
      {
        name: groups.dataInput,
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
          { name: 'Input Color', routerLink: 'components/input-color' },
          { name: 'Input Field', routerLink: 'components/input-field' },
          { name: 'Validator', routerLink: 'components/validator' },
          { name: 'Fieldset', routerLink: 'components/fieldset' },
          { name: 'Text Editor', routerLink: 'components/text-editor' },
        ]).orderBy('name'),
      },
    ]).orderBy('name');
  });

  readonly blocks = new KlArray<MenuOption>([
    { name: 'Datatable', routerLink: 'blocks/datatable' },
    { name: 'Login', routerLink: 'blocks/login' },
  ]).orderBy('name');

  readonly resources = computed(() => {
    const groups = UI_COPY[this.localeService.locale()].navGroups;
    return new KlArray<MenuOptions>([
      {
        name: groups.abstractions,
        items: new KlArray<MenuOption>([
          { name: 'HttpBase', routerLink: 'resources/http-base' },
          { name: 'ListBase', routerLink: 'resources/list-base' },
          { name: 'PageBase', routerLink: 'resources/page-base' },
        ]).orderBy('name'),
      },
      {
        name: groups.others,
        items: new KlArray<MenuOption>([
          { name: 'Global Errors', routerLink: 'resources/global-errors' },
        ]).orderBy('name'),
      },
      {
        name: groups.security,
        items: new KlArray<MenuOption>([
          { name: 'Auth', routerLink: 'resources/auth' },
          { name: 'Rules', routerLink: 'resources/rules' },
        ]).orderBy('name'),
      },
    ]).orderBy('name');
  });
}
