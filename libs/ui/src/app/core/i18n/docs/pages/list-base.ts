import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const LIST_BASE_PAGE = {
  pt: {
    title: 'ListBase',
    description:
      'ListBase é uma abstração para listas de datatable: paginação, ordenação, filtros e um resource que carrega dados via service HTTP com getMany.',
    sections: {
      installation: {
        title: 'Instalação',
        description:
          'Use o Koala CLI para instalar list-base (inclui http-base, is-mobile e from-observable-with-signal).',
      },
      api: {
        title: 'API',
        api: {
          attributes: {
            title: 'Atributos',
            items: [
              {
                name: 'service',
                description:
                  'Service injetado no constructor (Type<TListService>). Deve estender HttpBase e implementar getMany.',
              },
              {
                name: 'currentPage',
                description:
                  'Signal com o número da página atual da lista, para paginação e posição do usuário.',
              },
              {
                name: 'pageSize',
                description:
                  'Signal com a quantidade de itens por página (padrão 30), enviado como limit no getMany.',
              },
              {
                name: 'totalItems',
                description:
                  'Signal com o total de itens. Atualizado automaticamente com o count retornado por getMany.',
              },
              {
                name: 'orderedBy',
                description: 'Signal com a ordenação atual da lista (field / direction).',
              },
              {
                name: 'filter',
                description: 'Signal com o filtro atual aplicado à lista (objeto espalhado no getMany).',
              },
              {
                name: 'filterPayload',
                description: 'Visão readonly do signal filter.',
              },
              {
                name: 'filterParams',
                description:
                  'Parâmetros usados pelo resource datalist (filter, page, pageSize, sortBy, order).',
              },
              {
                name: 'skeletonItems',
                description: 'Signal computado com a quantidade de skeletons no loading da lista.',
              },
              {
                name: 'defaultList',
                description: 'Resposta padrão { items: [], count: 0 } do resource datalist.',
              },
              {
                name: 'datalist',
                description:
                  'Resource embutido que chama service.getMany com page, limit, orderBy/direction e filtros.',
              },
              {
                name: 'isMobile',
                description: 'true quando window.innerWidth < 768 no momento da construção.',
              },
              {
                name: 'reload',
                description: 'Input signal que, quando true, dispara datalist.reload().',
              },
            ],
          },
          methods: {
            title: 'Métodos',
            items: [
              {
                name: 'reloadList',
                description: 'Recarrega o resource datalist.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Uso',
        description: 'Veja o uso no block de datatable',
      },
    },
  },
  en: {
    title: 'ListBase',
    description:
      'ListBase is an abstraction for datatable lists: pagination, sorting, filters, and a resource that loads data through an HTTP service with getMany.',
    sections: {
      installation: {
        title: 'Installation',
        description:
          'Use the Koala CLI to install list-base (includes http-base, is-mobile, and from-observable-with-signal).',
      },
      api: {
        title: 'API',
        api: {
          attributes: {
            title: 'Attributes',
            items: [
              {
                name: 'service',
                description:
                  'Service injected via the constructor (Type<TListService>). Must extend HttpBase and implement getMany.',
              },
              {
                name: 'currentPage',
                description:
                  'Signal that holds the current page number of the list for pagination.',
              },
              {
                name: 'pageSize',
                description:
                  'Signal that holds items per page (default 30), sent as limit to getMany.',
              },
              {
                name: 'totalItems',
                description:
                  'Signal that holds the total item count. Updated automatically from the getMany count.',
              },
              {
                name: 'orderedBy',
                description:
                  'Signal that holds the current list ordering (field / direction).',
              },
              {
                name: 'filter',
                description:
                  'Signal that holds the current filter object (spread into getMany).',
              },
              {
                name: 'filterPayload',
                description: 'Readonly view of the filter signal.',
              },
              {
                name: 'filterParams',
                description:
                  'Parameters used by the datalist resource (filter, page, pageSize, sortBy, order).',
              },
              {
                name: 'skeletonItems',
                description:
                  'Computed signal with skeleton placeholders while the list is loading.',
              },
              {
                name: 'defaultList',
                description: 'Default { items: [], count: 0 } response for the datalist resource.',
              },
              {
                name: 'datalist',
                description:
                  'Built-in resource that calls service.getMany with page, limit, orderBy/direction, and filters.',
              },
              {
                name: 'isMobile',
                description: 'true when window.innerWidth < 768 at construction time.',
              },
              {
                name: 'reload',
                description: 'Input signal that, when true, triggers datalist.reload().',
              },
            ],
          },
          methods: {
            title: 'Methods',
            items: [
              {
                name: 'reloadList',
                description: 'Reloads the datalist resource.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Usage',
        description: 'You can see the usage in the datatable block',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type ListBasePageCopy = (typeof LIST_BASE_PAGE)[Locale];
