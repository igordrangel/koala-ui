import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const CONFIRM_PAGE = {
  pt: {
    title: 'Confirm',
    description:
      'Um confirm dialog é um modal que pede confirmação ou rejeição de uma ação. Evita ações acidentais e confirma operações críticas.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente confirm.',
      },
      usage: {
        title: 'Uso',
      },
    },
  },
  en: {
    title: 'Confirm',
    description:
      'A confirm dialog is a modal that asks the user to confirm or reject an action. It is commonly used to prevent accidental actions or to ask for confirmation before performing a critical operation.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new confirm component.',
      },
      usage: {
        title: 'Usage',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type ConfirmPageCopy = (typeof CONFIRM_PAGE)[Locale];
