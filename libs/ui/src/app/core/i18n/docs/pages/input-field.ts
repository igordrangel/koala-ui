import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const INPUT_FIELD_PAGE = {
  pt: {
    title: 'Input Field',
    description: 'Input fields capturam entrada do usuário em um formulário.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente input field.',
      },
      sizes: {
        title: 'Tamanhos',
        description: 'Input fields estão disponíveis em 5 tamanhos: xs, sm, md, lg e xl. O tamanho padrão é md.',
      },
    },
  },
  en: {
    title: 'Input Field',
    description: 'Input fields can be used to capture user input in a form.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new input field component.',
      },
      sizes: {
        title: 'Sizes',
        description: 'Input fields are available in 5 different sizes: xs, sm, md, lg, and xl. The default size is md.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type InputFieldPageCopy = (typeof INPUT_FIELD_PAGE)[Locale];
