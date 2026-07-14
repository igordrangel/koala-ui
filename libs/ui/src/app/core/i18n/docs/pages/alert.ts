import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const ALERT_PAGE = {
  pt: {
    title: 'Alert',
    description:
      'Um alert dialog é um modal que exibe informações importantes ao usuário. É usado para notificar sobre um evento ou ação que exige atenção.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente alert.',
      },
      usage: {
        title: 'Uso',
      },
    },
  },
  en: {
    title: 'Alert',
    description:
      'An alert dialog is a modal that displays important information to the user. It is commonly used to notify the user about a specific event or action that requires their attention.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new alert component.',
      },
      usage: {
        title: 'Usage',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type AlertPageCopy = (typeof ALERT_PAGE)[Locale];
