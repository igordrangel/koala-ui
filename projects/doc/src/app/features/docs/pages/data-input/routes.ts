import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'autocomplete',
    loadComponent: () =>
      import('./pages/autocomplete/autocomplete.page').then(
        (c) => c.AutocompletePage
      ),
  },
  {
    path: 'field-group',
    loadComponent: () =>
      import('./pages/field-group/field-group.page').then(
        (c) => c.FieldGroupPage
      ),
  },
  {
    path: 'fieldset',
    loadComponent: () =>
      import('./pages/fieldset/fieldset.page').then((c) => c.FieldsetPage),
  },
  {
    path: 'input-checkbox',
    loadComponent: () =>
      import('./pages/input-checkbox/input-checkbox.page').then(
        (c) => c.InputCheckboxPage
      ),
  },
  {
    path: 'input-cnpj',
    loadComponent: () =>
      import('./pages/input-cnpj/input-cnpj.page').then((c) => c.InputCnpjPage),
  },
  {
    path: 'input-cpf',
    loadComponent: () =>
      import('./pages/input-cpf/input-cpf.page').then((c) => c.InputCpfPage),
  },
  {
    path: 'input-currency',
    loadComponent: () =>
      import('./pages/input-currency/input-currency.page').then(
        (c) => c.InputCurrencyPage
      ),
  },
  {
    path: 'input-date',
    loadComponent: () =>
      import('./pages/input-date/input-date.page').then((c) => c.InputDatePage),
  },
  {
    path: 'input-datetime',
    loadComponent: () =>
      import('./pages/input-datetime/input-datetime.page').then(
        (c) => c.InputDatetimePage
      ),
  },
  {
    path: 'input-email',
    loadComponent: () =>
      import('./pages/input-email/input-email.page').then(
        (c) => c.InputEmailPage
      ),
  },
  {
    path: 'input-month',
    loadComponent: () =>
      import('./pages/input-month/input-month.page').then(
        (c) => c.InputMonthPage
      ),
  },
  {
    path: 'input-password',
    loadComponent: () =>
      import('./pages/input-password/input-password.page').then(
        (c) => c.InputPasswordPage
      ),
  },
  {
    path: 'input-radio',
    loadComponent: () =>
      import('./pages/input-radio/input-radio.page').then(
        (c) => c.InputRadioPage
      ),
  },
  {
    path: 'input-text',
    loadComponent: () =>
      import('./pages/input-text/input-text.page').then((c) => c.InputTextPage),
  },
  {
    path: 'input-time',
    loadComponent: () =>
      import('./pages/input-time/input-time.page').then((c) => c.InputTimePage),
  },
  {
    path: 'input-url',
    loadComponent: () =>
      import('./pages/input-url/input-url.page').then((c) => c.InputUrlPage),
  },
  {
    path: 'select',
    loadComponent: () =>
      import('./pages/select/select.page').then((c) => c.SelectPage),
  },
  {
    path: 'switcher',
    loadComponent: () =>
      import('./pages/switcher/switcher.page').then((c) => c.SwitcherPage),
  },
  {
    path: 'textarea',
    loadComponent: () =>
      import('./pages/textarea/textarea.page').then((c) => c.TextareaPage),
  },
];
