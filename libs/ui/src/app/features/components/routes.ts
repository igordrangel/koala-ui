import { generateTitle } from '@/core/utils/generate-title';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'button',
    loadComponent: () => import('./button/button.page').then((m) => m.ButtonPage),
    title: generateTitle('Button'),
  },
  {
    path: 'loading',
    loadComponent: () => import('./loading/loading.page').then((m) => m.LoadingPage),
    title: generateTitle('Loading'),
  },
  {
    path: 'dropdown',
    loadComponent: () => import('./dropdown/dropdown.page').then((m) => m.DropdownPage),
    title: generateTitle('Dropdown'),
  },
  {
    path: 'modal',
    loadComponent: () => import('./modal/modal.page').then((m) => m.ModalPage),
    title: generateTitle('Modal'),
  },
  {
    path: 'side-window',
    loadComponent: () => import('./side-window/side-window.page').then((m) => m.SideWindowPage),
    title: generateTitle('Side Window'),
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    title: generateTitle('Tabs'),
  },
  {
    path: 'tooltip',
    loadComponent: () => import('./tooltip/tooltip.page').then((m) => m.TooltipPage),
    title: generateTitle('Tooltip'),
  },
  {
    path: 'stepper',
    loadComponent: () => import('./stepper/stepper.page').then((m) => m.StepperPage),
    title: generateTitle('Stepper'),
  },
  {
    path: 'collapse',
    loadComponent: () => import('./collapse/collapse.page').then((m) => m.CollapsePage),
    title: generateTitle('Collapse'),
  },
  {
    path: 'confirm',
    loadComponent: () => import('./confirm/confirm.page').then((m) => m.ConfirmPage),
    title: generateTitle('Confirm'),
  },
  {
    path: 'alert',
    loadComponent: () => import('./alert/alert.page').then((m) => m.AlertPage),
    title: generateTitle('Alert'),
  },
  {
    path: 'toast',
    loadComponent: () => import('./toast/toast.page').then((m) => m.ToastPage),
    title: generateTitle('Toast'),
  },
  {
    path: 'table',
    loadComponent: () => import('./table/table.page').then((m) => m.TablePage),
    title: generateTitle('Table'),
  },
  {
    path: 'skeleton',
    loadComponent: () => import('./skeleton/skeleton.page').then((m) => m.SkeletonPage),
    title: generateTitle('Skeleton'),
  },
  {
    path: 'pagination',
    loadComponent: () => import('./pagination/pagination.page').then((m) => m.PaginationPage),
    title: generateTitle('Pagination'),
  },
  {
    path: 'breadcrumb',
    loadComponent: () => import('./breadcrumb/breadcrumb.page').then((m) => m.BreadcrumbPage),
    title: generateTitle('Breadcrumb'),
  },
  {
    path: 'fieldset',
    loadComponent: () => import('./fieldset/fieldset.page').then((m) => m.FieldsetPage),
    title: generateTitle('Fieldset'),
  },
  {
    path: 'input-field',
    loadComponent: () => import('./input-field/input-field.page').then((m) => m.InputFieldPage),
    title: generateTitle('Input Field'),
  },
  {
    path: 'input-cpf',
    loadComponent: () => import('./input-cpf/input-cpf.page').then((m) => m.InputCpfPage),
    title: generateTitle('Input CPF'),
  },
  {
    path: 'input-cnpj',
    loadComponent: () => import('./input-cnpj/input-cnpj.page').then((m) => m.InputCnpjPage),
    title: generateTitle('Input CNPJ'),
  },
  {
    path: 'input-currency',
    loadComponent: () =>
      import('./input-currency/input-currency.page').then((m) => m.InputCurrencyPage),
    title: generateTitle('Input Currency'),
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./checkbox/checkbox.page').then((m) => m.CheckboxPage),
    title: generateTitle('Checkbox'),
  },
  {
    path: 'radio',
    loadComponent: () => import('./radio/radio.page').then((m) => m.RadioPage),
    title: generateTitle('Radio'),
  },
  {
    path: 'toggle',
    loadComponent: () => import('./toggle/toggle.page').then((m) => m.TogglePage),
    title: generateTitle('Toggle'),
  },
  {
    path: 'range',
    loadComponent: () => import('./range/range.page').then((m) => m.RangePage),
    title: generateTitle('Range'),
  },
  {
    path: 'select',
    loadComponent: () => import('./select/select.page').then((m) => m.SelectPage),
    title: generateTitle('Select'),
  },
  {
    path: 'combobox',
    loadComponent: () => import('./combobox/combobox.page').then((m) => m.ComboboxPage),
    title: generateTitle('Combobox'),
  },
  {
    path: 'validator',
    loadComponent: () => import('./validator/validator.page').then((m) => m.ValidatorPage),
    title: generateTitle('Validator'),
  },
  {
    path: 'textarea',
    loadComponent: () => import('./textarea/textarea.page').then((m) => m.TextareaPage),
    title: generateTitle('Textarea'),
  },
  {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar.page').then((m) => m.CalendarPage),
    title: generateTitle('Calendar'),
  },
  {
    path: 'inline-filter',
    loadComponent: () =>
      import('./inline-filter/inline-filter.page').then((m) => m.InlineFilterPage),
    title: generateTitle('Inline Filter'),
  },
  {
    path: 'bottom-sheet',
    loadComponent: () => import('./bottom-sheet/bottom-sheet.page').then((m) => m.BottomSheetPage),
    title: generateTitle('Bottom Sheet'),
  },
];
