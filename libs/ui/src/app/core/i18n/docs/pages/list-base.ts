import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const LIST_BASE_PAGE = {
  pt: {
    title: 'ListBase',
    description:
      'ListBase é uma abstração para listas de datatable, com estrutura e funcionalidades padrão. Estenda para listas específicas (usuários, produtos etc.).',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente list-base.',
      },
      api: {
        title: 'API',
        api: {
          attributes: {
            title: 'Atributos',
            items: [
              {
                name: 'currentPage',
                description:
                  'Signal com o número da página atual da lista, para paginação e posição do usuário.',
              },
              {
                name: 'pageSize',
                description: 'Signal com a quantidade de itens por página, para paginação.',
              },
              {
                name: 'totalItems',
                description: 'Signal com o total de itens da lista, para paginação e contagem.',
              },
              {
                name: 'orderedBy',
                description: 'Signal com a ordenação atual da lista.',
              },
              {
                name: 'filter',
                description: 'Signal com o filtro atual aplicado à lista.',
              },
              {
                name: 'skeletonItems',
                description: 'Signal computado com a quantidade de skeletons no loading da lista.',
              },
              {
                name: 'defaultList',
                description: 'Resposta padrão da lista para usar no resourceRef do datalist.',
              },
              {
                name: 'filterParams',
                description: 'Parâmetros usados para filtrar a lista.',
              },
              {
                name: 'datalist',
                description:
                  'Referência abstrata do datalist que deve ser implementada no componente que estende. É a fonte de dados da lista e oferece métodos para buscar e manipular os dados.',
              },
              {
                name: 'reload',
                description: 'Signal que dispara o reload da lista.',
              },
            ],
          },
          methods: {
            title: 'Métodos',
            items: [
              {
                name: 'reloadList',
                description:
                  'Método que seta o signal de reload como true, propagando o evento ao datatable.',
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
      'The ListBase is a abstraction resource for datatable lists, providing a default structure and functionalities for listing data. It serves as a base component that can be extended to create specific list implementations, such as user lists, product lists, etc.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new list-base component.',
      },
      api: {
        title: 'API',
        api: {
          attributes: {
            title: 'Attributes',
            items: [
              {
                name: 'currentPage',
                description:
                  "Signal that holds the current page number of the list. It can be used for pagination purposes and to keep track of the user's position within the list.",
              },
              {
                name: 'pageSize',
                description:
                  'Signal that holds the number of items per page in the list. It can be used for pagination purposes and to control the number of items displayed on each page.',
              },
              {
                name: 'totalItems',
                description:
                  'Signal that holds the total number of items in the list. It can be used for pagination purposes and to display the total count of items.',
              },
              {
                name: 'orderedBy',
                description:
                  'Signal that holds the current ordering of the list. It can be used to sort the list based on different criteria.',
              },
              {
                name: 'filter',
                description:
                  'Signal that holds the current filter applied to the list. It can be used to filter the list based on different criteria.',
              },
              {
                name: 'skeletonItems',
                description:
                  'Computed signal that holds the number of skeleton items to display while the list is loading. It can be used to provide a visual indication of loading state.',
              },
              {
                name: 'defaultList',
                description: 'Default list response to use in datalist resourceRef.',
              },
              {
                name: 'filterParams',
                description:
                  'Parameters used for filtering the list. It can be used to apply specific filter criteria to the list.',
              },
              {
                name: 'datalist',
                description:
                  'Abstract datalist resource reference that should be implemented in the extending component. It serves as a reference to the data source for the list and provides methods for fetching and manipulating the list data.',
              },
              {
                name: 'reload',
                description:
                  'Signal that triggers a reload of the list. It can be used to refresh the list data.',
              },
            ],
          },
          methods: {
            title: 'Methods',
            items: [
              {
                name: 'reloadList',
                description:
                  'Method that sets the reload signal to true, propagating the reload event to the datatable component.',
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
