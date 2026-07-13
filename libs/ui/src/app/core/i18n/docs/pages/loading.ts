import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const LOADING_PAGE = {
  pt: {
    title: 'Loading',
    description: 'Um componente de loading simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente loading.',
      },
      spinner: {
        title: 'Spinner',
        description: 'A variante spinner é o indicador clássico com elemento rotativo, usado enquanto um processo está em andamento.',
      },
      dots: {
        title: 'Dots',
        description: 'A variante dots anima vários pontos em sequência para indicar que o processo está em andamento.',
      },
      ring: {
        title: 'Ring',
        description: 'A variante ring é um indicador circular em forma de anel para processos em andamento.',
      },
      ball: {
        title: 'Ball',
        description: 'A variante ball anima várias bolinhas em sequência para indicar processo em andamento.',
      },
      bars: {
        title: 'Bars',
        description: 'A variante bars anima várias barras em sequência para indicar processo em andamento.',
      },
      infinity: {
        title: 'Infinity',
        description: 'A variante infinity anima pontos em sequência para indicar processo em andamento.',
      },
    },
  },
  en: {
    title: 'Loading',
    description: 'A simple loading component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new loading component.',
      },
      spinner: {
        title: 'Spinner',
        description: 'The spinner variant is a classic loading indicator that consists of a rotating element. It is commonly used to indicate that a process is ongoing and the user needs to wait.',
      },
      dots: {
        title: 'Dots',
        description: 'The dots variant is a simple loading indicator that consists of multiple dots that animate in a sequence. It is commonly used to indicate that a process is ongoing and the user needs to wait.',
      },
      ring: {
        title: 'Ring',
        description: 'The ring variant is a circular loading indicator that animates in a ring shape. It is commonly used to indicate that a process is ongoing and the user needs to wait.',
      },
      ball: {
        title: 'Ball',
        description: 'The ball variant is a simple loading indicator that consists of multiple balls that animate in a sequence. It is commonly used to indicate that a process is ongoing and the user needs to wait.',
      },
      bars: {
        title: 'Bars',
        description: 'The bars variant is a simple loading indicator that consists of multiple bars that animate in a sequence. It is commonly used to indicate that a process is ongoing and the user needs to wait.',
      },
      infinity: {
        title: 'Infinity',
        description: 'The infinity variant is a simple loading indicator that consists of multiple dots that animate in a sequence. It is commonly used to indicate that a process is ongoing and the user needs to wait.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type LoadingPageCopy = (typeof LOADING_PAGE)[Locale];
