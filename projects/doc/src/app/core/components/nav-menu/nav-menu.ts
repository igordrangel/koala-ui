import { Component } from '@angular/core';
import {
  VerticalMenuContainer,
  VerticalMenuItem,
} from '@koalarx/ui/shared/components/vertical-menu';
import { KlArray } from '@koalarx/utils/KlArray';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.html',
  imports: [VerticalMenuContainer, VerticalMenuItem],
})
export class NavMenu {
  items = [
    {
      module: 'Get Started',
      items: [
        {
          label: 'Introduction',
          link: '/docs/introduction',
        },
        {
          label: 'Installation',
          link: '/docs/installation',
        },
        {
          label: 'Theming',
          link: '/docs/theming',
        },
        {
          label: 'Configurations',
          link: '/docs/configurations',
        },
      ],
    },
    {
      module: 'Actions',
      items: new KlArray([
        {
          label: 'Button',
          link: '/docs/actions/button',
        },
        {
          label: 'Dropdown',
          link: '/docs/actions/dropdown',
        },
        {
          label: 'Dialog',
          link: '/docs/actions/dialog',
        },
        {
          label: 'Side Window',
          link: '/docs/actions/side-window',
        },
        {
          label: 'Confirm',
          link: '/docs/actions/confirm',
        },
      ]).orderBy('label'),
    },
    {
      module: 'Data Display',
      items: new KlArray([
        {
          label: 'Accordion',
          link: '/docs/data-display/accordion',
        },
        {
          label: 'Collapse',
          link: '/docs/data-display/collapse',
        },
        {
          label: 'Datatable',
          link: '/docs/data-display/datatable',
        },
      ]).orderBy('label'),
    },
    {
      module: 'Navigation',
      items: new KlArray([
        {
          label: 'Stepper',
          link: '/docs/navigation/stepper',
        },
      ]).orderBy('label'),
    },
    {
      module: 'Feedback',
      items: new KlArray([
        {
          label: 'Alert',
          link: '/docs/feedback/alert',
        },
        {
          label: 'Loader',
          link: '/docs/feedback/loader',
        },
        {
          label: 'Snackbar',
          link: '/docs/feedback/snackbar',
        },
        {
          label: 'Tooltip',
          link: '/docs/feedback/tooltip',
        },
      ]).orderBy('label'),
    },
    {
      module: 'Data Input',
      items: new KlArray([
        {
          label: 'Autocomplete',
          link: '/docs/data-input/autocomplete',
        },
        {
          label: 'Field Group',
          link: '/docs/data-input/field-group',
        },
        {
          label: 'Fieldset',
          link: '/docs/data-input/fieldset',
        },
        {
          label: 'Input Checkbox',
          link: '/docs/data-input/input-checkbox',
        },
        {
          label: 'Input CNPJ',
          link: '/docs/data-input/input-cnpj',
        },
        {
          label: 'Input CPF',
          link: '/docs/data-input/input-cpf',
        },
        {
          label: 'Input Currency',
          link: '/docs/data-input/input-currency',
        },
        {
          label: 'Input Date',
          link: '/docs/data-input/input-date',
        },
        {
          label: 'Input Datetime',
          link: '/docs/data-input/input-datetime',
        },
        {
          label: 'Input Email',
          link: '/docs/data-input/input-email',
        },
        {
          label: 'Input Month',
          link: '/docs/data-input/input-month',
        },
        {
          label: 'Input Password',
          link: '/docs/data-input/input-password',
        },
        {
          label: 'Input Radio',
          link: '/docs/data-input/input-radio',
        },
        {
          label: 'Input Text',
          link: '/docs/data-input/input-text',
        },
        {
          label: 'Input Time',
          link: '/docs/data-input/input-time',
        },
        {
          label: 'Input URL',
          link: '/docs/data-input/input-url',
        },
        {
          label: 'Select',
          link: '/docs/data-input/select',
        },
        {
          label: 'Switcher',
          link: '/docs/data-input/switcher',
        },
        {
          label: 'Textarea',
          link: '/docs/data-input/textarea',
        },
      ]).orderBy('label'),
    },
  ];
}
