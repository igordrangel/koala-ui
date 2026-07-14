import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const INPUT_CPF_PAGE = {
  pt: {
    title: 'Input CPF',
    description:
      'O Input CPF é um campo especializado para CPF (Cadastro de Pessoas Físicas). Inclui validação de formato e regras do CPF, guiando o usuário e dando feedback imediato em caso de erro.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente Input CPF.',
      },
      usage: {
        title: 'Uso',
      },
    },
  },
  en: {
    title: 'Input CPF',
    description:
      'The Input CPF component is a specialized input field designed for entering Brazilian CPF (Cadastro de Pessoas Físicas) numbers. It provides built-in validation to ensure that the entered CPF number is in the correct format and is valid according to the CPF rules. This component enhances user experience by guiding users to input their CPF correctly and providing immediate feedback on any errors.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new Input CPF component.',
      },
      usage: {
        title: 'Usage',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type InputCpfPageCopy = (typeof INPUT_CPF_PAGE)[Locale];
