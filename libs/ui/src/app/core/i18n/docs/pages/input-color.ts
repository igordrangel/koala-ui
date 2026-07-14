import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const INPUT_COLOR_PAGE = {
  pt: {
    title: 'Input Color',
    description:
      'Um color picker baseado no dropdown. Suporta reactive forms, modo inline para toolbars e opção transparente.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente input color.',
      },
      default: {
        title: 'Padrão',
        description:
          'No modo padrão, o picker aparece como um trigger no tamanho do input e emite o nome da cor da paleta.',
      },
      inline: {
        title: 'Inline',
        description:
          'Use o modo inline em toolbars compactas. Combine com clearable para permitir seleção de borda transparente.',
      },
    },
  },
  en: {
    title: 'Input Color',
    description:
      'A color picker built on top of the dropdown component. It supports reactive forms, inline mode for toolbars, and an optional transparent option.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new input color component.',
      },
      default: {
        title: 'Default',
        description:
          'The default picker renders as an input-sized trigger and emits the selected palette color name.',
      },
      inline: {
        title: 'Inline',
        description:
          'Use inline mode inside compact toolbars. Combine with clearable to allow a transparent border selection.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type InputColorPageCopy = (typeof INPUT_COLOR_PAGE)[Locale];
