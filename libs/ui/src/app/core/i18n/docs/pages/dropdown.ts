import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const DROPDOWN_PAGE = {
  pt: {
    title: 'Dropdown',
    description: 'Um componente de dropdown simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente dropdown.',
      },
      menuOptions: {
        title: 'Opções de menu',
        description: 'O dropdown tem várias opções de comportamento. Por exemplo, use closeOnClick para fechar ao clicar em uma opção.',
      },
      notifications: {
        title: 'Notificações',
        description: 'O dropdown também serve para exibir notificações. Por exemplo, use closeOnClick para fechar ao clicar em uma notificação.',
      },
      popover: {
        title: 'Popover',
        description: 'O dropdown também pode ser usado como popover, para exibir conteúdo customizado.',
      },
    },
  },
  en: {
    title: 'Dropdown',
    description: 'A simple dropdown component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new dropdown component.',
      },
      menuOptions: {
        title: 'Menu Options',
        description: 'The dropdown component has several options that can be used to customize its behavior. For example, you can use the closeOnClick option to close the dropdown when an option is clicked.',
      },
      notifications: {
        title: 'Notifications',
        description: 'The dropdown component can be used to display notifications. For example, you can use the closeOnClick option to close the dropdown when a notification is clicked.',
      },
      popover: {
        title: 'Popover',
        description: 'The dropdown component can also be used as a popover. This allows you to display custom content inside the dropdown.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type DropdownPageCopy = (typeof DROPDOWN_PAGE)[Locale];
