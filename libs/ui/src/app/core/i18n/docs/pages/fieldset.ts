import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const FIELDSET_PAGE = {
  pt: {
    title: 'Fieldset',
    description: 'Fieldsets agrupam campos relacionados em um formulário.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente fieldset.',
      },
      usage: {
        title: 'Uso',
        description:
          'Fieldset é um container para campos como input, select, textarea etc. Também tem label, error e hint para dar mais contexto ao campo.',
      },
      loginSample: {
        title: 'Exemplo de login',
        description: 'Um fieldset pode montar um formulário de login com campos de e-mail e senha.',
      },
    },
  },
  en: {
    title: 'Fieldset',
    description: 'Fieldsets can be used to group related input fields in a form.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new fieldset component.',
      },
      usage: {
        title: 'Usage',
        description:
          'Fieldsets is a container for fields like input, select, textarea, etc. It also has a label, error and a hint to provide more information about the field.',
      },
      loginSample: {
        title: 'Login sample',
        description:
          'A fieldset can be used to create a login form with email and password fields.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type FieldsetPageCopy = (typeof FIELDSET_PAGE)[Locale];
