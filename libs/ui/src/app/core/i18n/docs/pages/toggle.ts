import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const TOGGLE_PAGE = {
  pt: {
    title: 'Toggle',
    description: 'Um componente de toggle simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente toggle.',
      },
      variants: {
        title: 'Variantes',
        description:
          'O componente toggle oferece várias variantes para diferentes casos de uso e requisitos de design.',
      },
      sizes: {
        title: 'Tamanhos',
        description:
          'O componente toggle oferece tamanhos diferentes para várias necessidades de design.',
      },
      disabled: {
        title: 'Desabilitado',
        description:
          'O estado disabled indica que o botão não é interativo e não pode ser clicado.',
      },
    },
  },
  en: {
    title: 'Toggle',
    description: 'A simple toggle component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new toggle component.',
      },
      variants: {
        title: 'Variants',
        description:
          'The toggle component supports several variants to fit different use cases and design requirements.',
      },
      sizes: {
        title: 'Sizes',
        description:
          'The toggle component supports different sizes to accommodate various design needs.',
      },
      disabled: {
        title: 'Disabled',
        description:
          'The disabled state indicates that the button is not interactive and cannot be clicked.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type TogglePageCopy = (typeof TOGGLE_PAGE)[Locale];
