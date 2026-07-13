import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const HTTP_BASE_PAGE = {
  pt: {
    title: 'HttpBase',
    description: 'HttpBase é uma abstração para services HTTP, com helpers REST, download de arquivos e carga reativa via rxResource.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para adicionar HttpBase ao seu projeto.',
      },
      api: {
        title: 'API',
        api: {
          constructor: {
            title: 'Construtor',
            items: [
              {
                name: 'baseUrl',
                description: 'URL base da API.',
              },
              {
                name: 'endpoint',
                description: 'Segmento de endpoint do resource.',
              },
            ],
          },
          protectedMethods: {
            title: 'Métodos protegidos',
            items: [
              {
                name: 'url(resourcePath?)',
                description: 'Monta a URL completa da request.',
              },
              {
                name: 'get / post / put / patch / delete',
                description: 'Verbos HTTP.',
              },
              {
                name: 'getFile',
                description: 'GET com response arraybuffer.',
              },
              {
                name: 'downloadFile',
                description: 'Dispara download de arquivo no browser.',
              },
              {
                name: 'resource(options?, resourcePath?)',
                description: 'Retorna um rxResource para GET reativo.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Uso',
        description: 'Combine com Global Errors para feedback automático de erros HTTP.',
      },
    },
  },
  en: {
    title: 'HttpBase',
    description: 'HttpBase is an abstraction resource for HTTP services, providing REST helpers, file downloads, and reactive data loading via rxResource.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to add HttpBase to your project.',
      },
      api: {
        title: 'API',
        api: {
          constructor: {
            title: 'Constructor',
            items: [
              {
                name: 'baseUrl',
                description: 'API base URL.',
              },
              {
                name: 'endpoint',
                description: 'Resource endpoint segment.',
              },
            ],
          },
          protectedMethods: {
            title: 'Protected methods',
            items: [
              {
                name: 'url(resourcePath?)',
                description: 'Builds the full request URL.',
              },
              {
                name: 'get / post / put / patch / delete',
                description: 'HTTP verbs.',
              },
              {
                name: 'getFile',
                description: 'GET with arraybuffer response.',
              },
              {
                name: 'downloadFile',
                description: 'Triggers a browser file download.',
              },
              {
                name: 'resource(options?, resourcePath?)',
                description: 'Returns an rxResource for reactive GET.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Usage',
        description: 'Pair with Global Errors for automatic HTTP error feedback.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type HttpBasePageCopy = (typeof HTTP_BASE_PAGE)[Locale];
