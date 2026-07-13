import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const TOAST_PAGE = {
  pt: {
    title: 'Toast',
    description: 'Toast é uma notificação não bloqueante de feedback. Informa o resultado de uma ação ou evento do sistema.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente toast.',
      },
      usage: {
        title: 'Uso',
      },
    },
  },
  en: {
    title: 'Toast',
    description: 'A toast is a non-blocking notification that provides feedback to the user. It is commonly used to inform the user about the result of an action or a system event.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new toast component.',
      },
      usage: {
        title: 'Usage',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type ToastPageCopy = (typeof TOAST_PAGE)[Locale];
