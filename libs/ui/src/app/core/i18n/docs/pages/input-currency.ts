import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const INPUT_CURRENCY_PAGE = {
  pt: {
    title: 'Currency',
    description:
      'O componente Currency é um campo especializado para valores monetários. Inclui validação de formato e regras de moeda, guiando o usuário e dando feedback imediato em caso de erro.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente Input Currency.',
      },
      usage: {
        title: 'Uso',
      },
    },
  },
  en: {
    title: 'Currency',
    description:
      'The Currency component is a specialized input field designed for entering currency values. It provides built-in validation to ensure that the entered value is in the correct format and is valid according to the currency rules. This component enhances user experience by guiding users to input their currency values correctly and providing immediate feedback on any errors.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new Input Currency component.',
      },
      usage: {
        title: 'Usage',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type InputCurrencyPageCopy = (typeof INPUT_CURRENCY_PAGE)[Locale];
