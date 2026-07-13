import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const BREADCRUMB_PAGE = {
  pt: {
    title: 'Breadcrumb',
    description: 'Breadcrumb é um auxiliar de navegação que mostra onde o usuário está no site ou aplicação. Ele oferece um rastro de links para páginas ou seções anteriores.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente breadcrumb.',
      },
      usage: {
        title: 'Uso',
      },
    },
  },
  en: {
    title: 'Breadcrumb',
    description: 'A breadcrumb is a navigation aid that helps users understand their location within a website or application. It provides a trail of links back to the previous pages or sections.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new breadcrumb component.',
      },
      usage: {
        title: 'Usage',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type BreadcrumbPageCopy = (typeof BREADCRUMB_PAGE)[Locale];
