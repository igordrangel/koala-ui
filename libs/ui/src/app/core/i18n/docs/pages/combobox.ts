import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const COMBOBOX_PAGE = {
  pt: {
    title: 'Combobox',
    description:
      'Um select pesquisável feito com Angular Aria, com filtro local ou remoto via resource e estados dedicados de loading e vazio.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente combobox.',
      },
      localFiltering: {
        title: 'Filtro local',
        description:
          'Com uma lista estática de opções, o componente filtra internamente e se comporta como um select pesquisável. Também é possível habilitar seleção múltipla.',
      },
      remoteFilteringWithResource: {
        title: 'Filtro remoto com resource',
        description:
          'O componente aceita uma factory que recebe o signal de filtro e cria internamente um resource, httpResource ou rxResource para buscar resultados.',
      },
    },
  },
  en: {
    title: 'Combobox',
    description:
      'A searchable select built with Angular Aria, supporting local or remote filtering through a resource and dedicated loading and empty states.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new combobox component.',
      },
      localFiltering: {
        title: 'Local Filtering',
        description:
          'When you pass a static option list, the component filters it internally and behaves like a searchable select. You can also enable multiple selection.',
      },
      remoteFilteringWithResource: {
        title: 'Remote Filtering With Resource',
        description:
          'The component accepts a factory that receives the filter signal and creates a resource, httpResource, or rxResource internally to fetch matching results.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type ComboboxPageCopy = (typeof COMBOBOX_PAGE)[Locale];
