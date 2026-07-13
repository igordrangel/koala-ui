import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const GLOBAL_ERRORS_PAGE = {
  pt: {
    title: 'Global Errors',
    description: 'Global Errors dá feedback automático de erros HTTP via toast. Um interceptor global captura requests com falha e mostra mensagens amigáveis.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para adicionar Global Errors ao seu projeto (inclui Toast e setup do app.config).',
      },
      api: {
        title: 'API',
        api: {
          interceptor: {
            title: 'Interceptor',
            items: [
              {
                name: 'FeedbackRequestInterceptor',
                description: 'Captura erros HTTP e delega para HttpErrorFeedbackAlert.',
              },
            ],
          },
          service: {
            title: 'Service',
            items: [
              {
                name: 'HttpErrorFeedbackAlert.tapError()',
                description: 'Exibe toasts de warning (4xx), error (5xx) ou info.',
              },
            ],
          },
          middleware: {
            title: 'Middleware',
            items: [
              {
                name: 'HttpErrorMiddleware.handleError()',
                description: 'Retorna uma mensagem sanitizada.',
              },
              {
                name: 'HttpErrorMiddleware.ignoreError()',
                description: 'Ignora feedback para erros específicos (customizável após a instalação).',
              },
            ],
          },
          utility: {
            title: 'Utilitário',
            items: [
              {
                name: 'sanitizeErrorMessage()',
                description: 'Extrai ou mapeia mensagens de HttpErrorResponse.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Uso',
        description: 'Requer o componente Toast.',
      },
    },
  },
  en: {
    title: 'Global Errors',
    description: 'Global Errors provides automatic HTTP error feedback via toast notifications. A global interceptor captures failed requests and displays user-friendly messages.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to add Global Errors to your project (includes Toast and app.config setup).',
      },
      api: {
        title: 'API',
        api: {
          interceptor: {
            title: 'Interceptor',
            items: [
              {
                name: 'FeedbackRequestInterceptor',
                description: 'Captures HTTP errors and delegates to HttpErrorFeedbackAlert.',
              },
            ],
          },
          service: {
            title: 'Service',
            items: [
              {
                name: 'HttpErrorFeedbackAlert.tapError()',
                description: 'Shows warning (4xx), error (5xx), or info toasts.',
              },
            ],
          },
          middleware: {
            title: 'Middleware',
            items: [
              {
                name: 'HttpErrorMiddleware.handleError()',
                description: 'Returns a sanitized message.',
              },
              {
                name: 'HttpErrorMiddleware.ignoreError()',
                description: 'Skips feedback for specific errors (customize after install).',
              },
            ],
          },
          utility: {
            title: 'Utility',
            items: [
              {
                name: 'sanitizeErrorMessage()',
                description: 'Extracts or maps messages from HttpErrorResponse.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Usage',
        description: 'Requires the Toast component.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type GlobalErrorsPageCopy = (typeof GLOBAL_ERRORS_PAGE)[Locale];
