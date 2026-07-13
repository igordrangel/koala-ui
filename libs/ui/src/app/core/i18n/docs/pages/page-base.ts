import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const PAGE_BASE_PAGE = {
  pt: {
    title: 'PageBase',
    description: 'PageBase é uma abstração para páginas, com navegação por breadcrumb e signal de reload para listas ou tables filhas.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para adicionar PageBase ao seu projeto.',
      },
      api: {
        title: 'API',
        api: {
          signals: {
            title: 'Signals',
            items: [
              {
                name: 'reload',
                description: 'Signal usado para disparar reload em componentes filhos.',
              },
            ],
          },
          methods: {
            title: 'Métodos',
            items: [
              {
                name: 'reloadList()',
                description: 'Seta reload por um instante para que os filhos reajam.',
              },
            ],
          },
          properties: {
            title: 'Propriedades',
            items: [
              {
                name: 'breadcrumbs',
                description: 'Trilha de breadcrumb computada a partir do ActivatedRoute atual.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Uso',
        description: 'Use com o componente Breadcrumb.',
      },
    },
  },
  en: {
    title: 'PageBase',
    description: 'PageBase is an abstraction resource for page components, providing breadcrumb navigation and a reload signal for child lists or tables.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to add PageBase to your project.',
      },
      api: {
        title: 'API',
        api: {
          signals: {
            title: 'Signals',
            items: [
              {
                name: 'reload',
                description: 'Signal used to trigger a reload in child components.',
              },
            ],
          },
          methods: {
            title: 'Methods',
            items: [
              {
                name: 'reloadList()',
                description: 'Sets reload briefly so bound children can react.',
              },
            ],
          },
          properties: {
            title: 'Properties',
            items: [
              {
                name: 'breadcrumbs',
                description: 'Computed breadcrumb trail from the current ActivatedRoute.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Usage',
        description: 'Use with the Breadcrumb component.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type PageBasePageCopy = (typeof PAGE_BASE_PAGE)[Locale];
