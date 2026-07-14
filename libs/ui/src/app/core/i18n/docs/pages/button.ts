import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const BUTTON_PAGE = {
  pt: {
    title: 'Button',
    description: 'Um componente de botão simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente button.',
      },
      variants: {
        title: 'Variantes',
        description:
          'O componente button oferece várias variantes para diferentes casos de uso e requisitos de design.',
      },
      sizes: {
        title: 'Tamanhos',
        description:
          'O componente button oferece tamanhos diferentes para atender a várias necessidades de design.',
      },
      outline: {
        title: 'Outline',
        description:
          'A variante outline traz borda e fundo transparente, ideal para ações secundárias.',
      },
      soft: {
        title: 'Soft',
        description:
          'A variante soft usa um fundo mais suave, adequada para ações menos destacadas.',
      },
      dash: {
        title: 'Dash',
        description: 'A variante dash usa borda tracejada, adequada para ações menos destacadas.',
      },
      disabled: {
        title: 'Desabilitado',
        description:
          'O estado disabled indica que o botão não é interativo e não pode ser clicado.',
      },
      circle: {
        title: 'Circle',
        description: 'A variante circle deixa o botão circular, ideal para botões de ícone.',
      },
    },
  },
  en: {
    title: 'Button',
    description: 'A simple button component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new button component.',
      },
      variants: {
        title: 'Variants',
        description:
          'The button component supports several variants to fit different use cases and design requirements.',
      },
      sizes: {
        title: 'Sizes',
        description:
          'The button component supports different sizes to accommodate various design needs.',
      },
      outline: {
        title: 'Outline',
        description:
          'The outline variant provides a button style with a border and transparent background, ideal for secondary actions.',
      },
      soft: {
        title: 'Soft',
        description:
          'The soft variant offers a button style with a softer background color, suitable for less prominent actions.',
      },
      dash: {
        title: 'Dash',
        description:
          'The dash variant provides a button style with a dashed border, suitable for less prominent actions.',
      },
      disabled: {
        title: 'Disabled',
        description:
          'The disabled state indicates that the button is not interactive and cannot be clicked.',
      },
      circle: {
        title: 'Circle',
        description:
          'The circle variant provides a button style with a circular shape, ideal for icon buttons.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type ButtonPageCopy = (typeof BUTTON_PAGE)[Locale];
