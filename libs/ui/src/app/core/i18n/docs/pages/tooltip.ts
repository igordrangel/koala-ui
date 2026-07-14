import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const TOOLTIP_PAGE = {
  pt: {
    title: 'Tooltip',
    description: 'Um componente de tooltip simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente tooltip.',
      },
      variants: {
        title: 'Variantes',
        description:
          'O componente tooltip oferece várias variantes para diferentes casos de uso e requisitos de design.',
      },
      positions: {
        title: 'Posições',
        description:
          'O componente tooltip oferece posições diferentes para várias necessidades de design.',
      },
    },
  },
  en: {
    title: 'Tooltip',
    description: 'A simple tooltip component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new tooltip component.',
      },
      variants: {
        title: 'Variants',
        description:
          'The tooltip component supports several variants to fit different use cases and design requirements.',
      },
      positions: {
        title: 'Positions',
        description:
          'The tooltip component supports different positions to accommodate various design needs.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type TooltipPageCopy = (typeof TOOLTIP_PAGE)[Locale];
