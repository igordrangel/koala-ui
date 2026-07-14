import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const RADIO_PAGE = {
  pt: {
    title: 'Radio',
    description: 'Um componente de radio simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente radio.',
      },
      variants: {
        title: 'Variantes',
        description:
          'O componente radio oferece várias variantes para diferentes casos de uso e requisitos de design.',
      },
      sizes: {
        title: 'Tamanhos',
        description:
          'O componente radio oferece tamanhos diferentes para várias necessidades de design.',
      },
      disabled: {
        title: 'Desabilitado',
        description:
          'O estado disabled indica que o radio não é interativo e não pode ser selecionado.',
      },
    },
  },
  en: {
    title: 'Radio',
    description: 'A simple radio component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new radio component.',
      },
      variants: {
        title: 'Variants',
        description:
          'The radio component supports several variants to fit different use cases and design requirements.',
      },
      sizes: {
        title: 'Sizes',
        description:
          'The radio component supports different sizes to accommodate various design needs.',
      },
      disabled: {
        title: 'Disabled',
        description:
          'The disabled state indicates that the radio button is not interactive and cannot be selected.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type RadioPageCopy = (typeof RADIO_PAGE)[Locale];
