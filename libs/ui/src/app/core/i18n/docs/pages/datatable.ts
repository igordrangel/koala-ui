import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const DATATABLE_PAGE = {
  pt: {
    title: 'Datatable',
    description:
      'O datatable exibe dados tabulares com ordenação, filtro, paginação e estilo customizável — essencial para grandes conjuntos de dados.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente datatable.',
      },
      usage: {
        title: 'Uso',
      },
    },
  },
  en: {
    title: 'Datatable',
    description:
      'The datatable component is a powerful and flexible tool for displaying tabular data in a structured format. It provides features such as sorting, filtering, pagination, and customizable styling, making it an essential component for any application that requires the presentation of large datasets.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new datatable component.',
      },
      usage: {
        title: 'Usage',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type DatatablePageCopy = (typeof DATATABLE_PAGE)[Locale];
