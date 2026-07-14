import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const VALIDATOR_PAGE = {
  pt: {
    title: 'Validator',
    description: 'Validators garantem que a entrada do usuário atenda a critérios específicos.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente validator.',
      },
      usage: {
        title: 'Uso',
        description:
          'Validators garantem critérios de entrada. Podem ser aplicados a campos para feedback em tempo real e regras.',
      },
    },
  },
  en: {
    title: 'Validator',
    description: 'Validators can be used to ensure that user input meets specific criteria.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new validator component.',
      },
      usage: {
        title: 'Usage',
        description:
          'Validators are used to ensure that user input meets specific criteria. They can be applied to input fields to provide real-time feedback and enforce rules.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type ValidatorPageCopy = (typeof VALIDATOR_PAGE)[Locale];
