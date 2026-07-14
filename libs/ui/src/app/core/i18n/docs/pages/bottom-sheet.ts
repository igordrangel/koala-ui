import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const BOTTOM_SHEET_PAGE = {
  pt: {
    title: 'Bottom Sheet',
    description:
      'O bottom sheet é um modal que desliza de baixo da tela. É usado para mostrar informações ou opções extras sem sair da página atual.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente bottom sheet.',
      },
      bottomSheet: {
        title: 'Bottom Sheet',
        description:
          'O bottom sheet é um componente modal que desliza de baixo da tela. É usado para mostrar informações ou opções extras sem sair da página atual.',
      },
      bottomSheetCloseButton: {
        title: 'Bottom Sheet com botão de fechar no canto',
        description:
          'O bottom sheet pode ser configurado com um botão de fechar no canto. É um padrão comum para bottom sheets com informação crítica ou que exigem interação do usuário.',
      },
    },
  },
  en: {
    title: 'Bottom Sheet',
    description:
      'The bottom sheet is a modal that slides in from the bottom of the screen. It is commonly used to display additional information or options without navigating away from the current page.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new bottom sheet component.',
      },
      bottomSheet: {
        title: 'Bottom Sheet',
        description:
          'The bottom sheet is a modal component that slides in from the bottom of the screen. It is commonly used to display additional information or options without navigating away from the current page.',
      },
      bottomSheetCloseButton: {
        title: 'Bottom Sheet with a close button at corner',
        description:
          'The bottom sheet can be configured to have a close button at the corner. This is a common design pattern for bottom sheets that are used to display critical information or that require user interaction.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type BottomSheetPageCopy = (typeof BOTTOM_SHEET_PAGE)[Locale];
