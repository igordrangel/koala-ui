import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const MODAL_PAGE = {
  pt: {
    title: 'Modal',
    description: 'Um componente de modal simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente modal.',
      },
      dialogModal: {
        title: 'Dialog modal',
        description: 'O dialog modal é o modal clássico centralizado. Serve para informação importante ou para pedir uma decisão ao usuário.',
      },
      dialogModalClosesOutside: {
        title: 'Dialog modal que fecha ao clicar fora',
        description: 'O dialog modal pode fechar ao clicar fora. Comportamento comum para informação não crítica ou que não exige interação.',
      },
      dialogModalCloseButton: {
        title: 'Dialog modal com botão de fechar no canto',
        description: 'O dialog modal pode ter um botão de fechar no canto. Padrão comum para informação crítica ou que exige interação.',
      },
      dialogModalCustomWidth: {
        title: 'Dialog modal com largura customizada',
        description: 'O dialog modal pode ter largura customizada, útil para mais conteúdo ou layouts específicos.',
      },
    },
  },
  en: {
    title: 'Modal',
    description: 'A simple modal component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new modal component.',
      },
      dialogModal: {
        title: 'Dialog modal',
        description: 'The dialog modal is a classic modal component that can be used to display content in a centered overlay. It is commonly used to display important information or prompt the user for a decision.',
      },
      dialogModalClosesOutside: {
        title: 'Dialog modal, closes when clicked outside',
        description: 'The dialog modal can be configured to close when the user clicks outside of it. This is a common behavior for modals that are used to display non-critical information or that do not require user interaction.',
      },
      dialogModalCloseButton: {
        title: 'Dialog modal with a close button at corner',
        description: 'The dialog modal can be configured to have a close button at the corner. This is a common design pattern for modals that are used to display critical information or that require user interaction.',
      },
      dialogModalCustomWidth: {
        title: 'Dialog modal with custom width',
        description: 'The dialog modal can be configured to have a custom width. This is useful for modals that need to display more content or require a specific layout.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type ModalPageCopy = (typeof MODAL_PAGE)[Locale];
