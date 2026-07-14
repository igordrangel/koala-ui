import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const SELECT_PAGE = {
  pt: {
    title: 'Select',
    description: 'Um select que suporta seleção simples e múltipla via popover.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente select.',
      },
      singleSelection: {
        title: 'Seleção simples',
        description:
          'Modo padrão. Ao selecionar uma opção, o popover fecha e emite um único valor.',
      },
      multipleSelection: {
        title: 'Seleção múltipla',
        description:
          'Use multiple para permitir mais de uma opção. O valor é reportado como array.',
      },
      sizes: {
        title: 'Tamanhos',
        description:
          'O componente select oferece tamanhos diferentes para várias necessidades de design.',
      },
      disabled: {
        title: 'Desabilitado',
        description:
          'O estado disabled indica que o select não é interativo e não pode ser alterado.',
      },
    },
  },
  en: {
    title: 'Select',
    description:
      'A select component that supports both single and multiple selection via a popover.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new select component.',
      },
      singleSelection: {
        title: 'Single selection',
        description:
          'Default mode. Selecting an option closes the popover and emits a single value.',
      },
      multipleSelection: {
        title: 'Multiple selection',
        description:
          'Add multiple to allow selecting more than one option. The value is reported as an array.',
      },
      sizes: {
        title: 'Sizes',
        description:
          'The select component supports different sizes to accommodate various design needs.',
      },
      disabled: {
        title: 'Disabled',
        description:
          'The disabled state indicates that the select component is not interactive and cannot be changed.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type SelectPageCopy = (typeof SELECT_PAGE)[Locale];
