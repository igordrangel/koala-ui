import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const LOGIN_PAGE = {
  pt: {
    title: 'Login',
    description: 'O block de login oferece a UI para credenciais e acesso à aplicação. Em geral inclui usuário/e-mail, senha e botão de submit.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo block login.',
      },
      sample: {
        title: 'Exemplo',
      },
    },
  },
  en: {
    title: 'Login',
    description: 'The login block provides a user interface for users to enter their credentials and access the application. It typically includes fields for username/email and password, along with a submit button to initiate the login process.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new login block.',
      },
      sample: {
        title: 'Sample',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type LoginPageCopy = (typeof LOGIN_PAGE)[Locale];
