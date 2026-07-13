import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const TEXTAREA_PAGE = {
  pt: {
    title: 'Textarea',
    description: 'Textareas capturam entrada multilinha em um formulário.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente textarea.',
      },
      sizes: {
        title: 'Tamanhos',
        description: 'Textareas estão disponíveis em 5 tamanhos: xs, sm, md, lg e xl. O tamanho padrão é md.',
      },
    },
  },
  en: {
    title: 'Textarea',
    description: 'Textareas can be used to capture multi-line user input in a form.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new textarea component.',
      },
      sizes: {
        title: 'Sizes',
        description: 'Textareas are available in 5 different sizes: xs, sm, md, lg, and xl. The default size is md.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type TextareaPageCopy = (typeof TEXTAREA_PAGE)[Locale];
