import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const SIDE_WINDOW_PAGE = {
  pt: {
    title: 'Side Window',
    description:
      'O side window é um modal que desliza da lateral da tela. Serve para informações ou opções extras sem sair da página.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente side window.',
      },
      sideWindow: {
        title: 'Side Window',
        description:
          'O side window é um componente modal que desliza da lateral da tela. Serve para informações ou opções extras sem sair da página.',
      },
      sideWindowCloseButton: {
        title: 'Side Window com botão de fechar no canto',
        description:
          'O side window pode ter um botão de fechar no canto. Padrão comum para informação crítica ou que exige interação.',
      },
    },
  },
  en: {
    title: 'Side Window',
    description:
      'The side window is a modal that slides in from the side of the screen. It is commonly used to display additional information or options without navigating away from the current page.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new side window component.',
      },
      sideWindow: {
        title: 'Side Window',
        description:
          'The side window is a modal component that slides in from the side of the screen. It is commonly used to display additional information or options without navigating away from the current page.',
      },
      sideWindowCloseButton: {
        title: 'Side Window with a close button at corner',
        description:
          'The side window can be configured to have a close button at the corner. This is a common design pattern for side windows that are used to display critical information or that require user interaction.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type SideWindowPageCopy = (typeof SIDE_WINDOW_PAGE)[Locale];
