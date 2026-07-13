import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const TABS_PAGE = {
  pt: {
    title: 'Tabs',
    description: 'Tabs exibem uma lista de links em formato de abas.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente tab.',
      },
      tabs: {
        title: 'Tabs',
        description: 'Tabs organizam conteúdo em abas e melhoram a navegação na aplicação.',
      },
    },
  },
  en: {
    title: 'Tabs',
    description: 'Tabs can be used to show a list of links in a tabbed format.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new tab component.',
      },
      tabs: {
        title: 'Tabs',
        description: 'Tabs are a classic UI component that can be used to display content in a tabbed format. They are commonly used to organize information and improve navigation within an application.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type TabsPageCopy = (typeof TABS_PAGE)[Locale];
