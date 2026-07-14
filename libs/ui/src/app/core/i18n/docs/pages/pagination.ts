import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const PAGINATION_PAGE = {
  pt: {
    title: 'Pagination',
    description: 'Um componente de pagination simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente pagination.',
      },
      sizes: {
        title: 'Tamanhos',
        description:
          'O componente pagination oferece tamanhos diferentes para várias necessidades de design.',
      },
    },
  },
  en: {
    title: 'Pagination',
    description: 'A simple pagination component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new pagination component.',
      },
      sizes: {
        title: 'Sizes',
        description:
          'The pagination component supports different sizes to accommodate various design needs.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type PaginationPageCopy = (typeof PAGINATION_PAGE)[Locale];
