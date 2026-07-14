import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const STEPPER_PAGE = {
  pt: {
    title: 'Stepper',
    description:
      'Steppers exibem conteúdo passo a passo. São usados para guiar o usuário em um processo ou fluxo na aplicação.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente stepper.',
      },
      usage: {
        title: 'Uso',
      },
    },
  },
  en: {
    title: 'Stepper',
    description:
      'Steppers are a classic UI component that can be used to display content in a step-by-step format. They are commonly used to guide users through a process or workflow within an application.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new stepper component.',
      },
      usage: {
        title: 'Usage',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type StepperPageCopy = (typeof STEPPER_PAGE)[Locale];
