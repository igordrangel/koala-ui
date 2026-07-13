import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const INPUT_CNPJ_PAGE = {
  pt: {
    title: 'Input CNPJ',
    description: 'O Input CNPJ é um campo especializado para CNPJ (Cadastro Nacional da Pessoa Jurídica). Inclui validação de formato e regras do CNPJ, guiando o usuário e dando feedback imediato em caso de erro.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente Input CNPJ.',
      },
      usage: {
        title: 'Uso',
      },
    },
  },
  en: {
    title: 'Input CNPJ',
    description: 'The Input CNPJ component is a specialized input field designed for entering Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica) numbers. It provides built-in validation to ensure that the entered CNPJ number is in the correct format and is valid according to the CNPJ rules. This component enhances user experience by guiding users to input their CNPJ correctly and providing immediate feedback on any errors.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new Input CNPJ component.',
      },
      usage: {
        title: 'Usage',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type InputCnpjPageCopy = (typeof INPUT_CNPJ_PAGE)[Locale];
