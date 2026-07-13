import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const AUTH_PAGE = {
  pt: {
    title: 'Auth',
    description: 'Este resource oferece interceptor, guard e service para autenticação. Protege rotas, gerencia sessões e tarefas relacionadas a auth.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente auth.',
      },
      api: {
        title: 'API',
        api: {
          signalsAndProperties: {
            title: 'Signals e propriedades',
            items: [
              {
                name: 'loggedUser',
                description: 'Signal com o usuário autenticado atual (ou undefined).',
              },
              {
                name: 'event',
                description: 'Signal que emite eventos de autenticação (login, falha, loading etc.).',
              },
              {
                name: 'hasToken',
                description: 'Signal computado indicando se há access token.',
              },
              {
                name: 'accessToken',
                description: 'Getter do access token atual.',
              },
              {
                name: 'refreshToken',
                description: 'Getter do refresh token atual.',
              },
              {
                name: 'isAuthenticated',
                description: 'Signal computado indicando se há usuário autenticado.',
              },
            ],
          },
          methods: {
            title: 'Métodos',
            items: [
              {
                name: 'auth(credentials: Credentials)',
                description: 'Faz login com as credenciais informadas.',
              },
              {
                name: 'logout()',
                description: 'Faz logout, limpando tokens e estado do usuário.',
              },
              {
                name: 'updateToken()',
                description: 'Atualiza o access token usando o refresh token.',
              },
              {
                name: 'isExpired()',
                description: 'Retorna true se o access token estiver expirado.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Uso',
        description: 'Veja o uso no block de login.',
      },
    },
  },
  en: {
    title: 'Auth',
    description: 'This resource provides interceptor, guard and service to handle authentication in your application. It can be used to protect routes, manage user sessions, and handle authentication-related tasks.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new auth component.',
      },
      api: {
        title: 'API',
        api: {
          signalsAndProperties: {
            title: 'Signals and Properties',
            items: [
              {
                name: 'loggedUser',
                description: 'Signal holding the currently authenticated user (or undefined).',
              },
              {
                name: 'event',
                description: 'Signal that emits authentication events (login, failure, loading, etc).',
              },
              {
                name: 'hasToken',
                description: 'Computed signal indicating if an access token is present.',
              },
              {
                name: 'accessToken',
                description: 'Getter for the current access token.',
              },
              {
                name: 'refreshToken',
                description: 'Getter for the current refresh token.',
              },
              {
                name: 'isAuthenticated',
                description: 'Computed signal indicating if a user is authenticated.',
              },
            ],
          },
          methods: {
            title: 'Methods',
            items: [
              {
                name: 'auth(credentials: Credentials)',
                description: 'Performs login with the provided credentials.',
              },
              {
                name: 'logout()',
                description: 'Logs out, clearing tokens and user state.',
              },
              {
                name: 'updateToken()',
                description: 'Updates the access token using the refresh token.',
              },
              {
                name: 'isExpired()',
                description: 'Returns true if the access token is expired.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Usage',
        description: 'You can see the usage in the login block.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type AuthPageCopy = (typeof AUTH_PAGE)[Locale];
