import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const CHECKBOX_PAGE = {
  pt: {
    title: 'Checkbox',
    description: 'Um componente de checkbox simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente checkbox.',
      },
      variants: {
        title: 'Variantes',
        description:
          'O componente checkbox oferece várias variantes para diferentes casos de uso e requisitos de design.',
      },
      sizes: {
        title: 'Tamanhos',
        description:
          'O componente checkbox oferece tamanhos diferentes para atender a várias necessidades de design.',
      },
      disabled: {
        title: 'Desabilitado',
        description:
          'O estado disabled indica que o botão não é interativo e não pode ser clicado.',
      },
    },
  },
  en: {
    title: 'Checkbox',
    description: 'A simple checkbox component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new checkbox component.',
      },
      variants: {
        title: 'Variants',
        description:
          'The checkbox component supports several variants to fit different use cases and design requirements.',
      },
      sizes: {
        title: 'Sizes',
        description:
          'The checkbox component supports different sizes to accommodate various design needs.',
      },
      disabled: {
        title: 'Disabled',
        description:
          'The disabled state indicates that the button is not interactive and cannot be clicked.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type CheckboxPageCopy = (typeof CHECKBOX_PAGE)[Locale];
