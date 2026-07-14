import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const INLINE_FILTER_PAGE = {
  pt: {
    title: 'Inline Filter',
    description:
      'Um builder flexível para regras de filtro dinâmicas. Escolha o tipo e preencha cada regra com text, select, selectMultiple, currency, date ou combobox.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente filter.',
      },
      builder: {
        title: 'Builder',
        description:
          'Este componente foca em fluxos de filtro. As regras aplicadas sincronizam com query params e são rehidratadas ao voltar para a tela.',
      },
    },
  },
  en: {
    title: 'Inline Filter',
    description:
      'A flexible filter builder for creating dynamic query rules. Choose a filter type and fill each rule with text, select, selectMultiple, currency, date, or combobox inputs.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new filter component.',
      },
      builder: {
        title: 'Builder',
        description:
          'This component focuses on filtering workflows. Applied rules sync to query params and are automatically rehydrated when you return to this screen.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type InlineFilterPageCopy = (typeof INLINE_FILTER_PAGE)[Locale];
