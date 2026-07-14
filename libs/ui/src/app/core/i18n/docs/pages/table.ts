import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const TABLE_PAGE = {
  pt: {
    title: 'Table',
    description: 'Tables exibem dados em formato estruturado.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente table.',
      },
      tables: {
        title: 'Tables',
        description:
          'Tables organizam dados em formato estruturado e melhoram a navegação na aplicação.',
      },
      ordenableTable: {
        title: 'Table ordenável',
        description:
          'Tables ordenáveis permitem ordenar colunas ao clicar no header. Melhoram usabilidade e ajudam a encontrar e organizar dados.',
      },
      tablesZebra: {
        title: 'Tables zebra',
        description:
          'Tables zebra alternam a cor das linhas para melhor legibilidade e distinção visual.',
      },
      tablesPinHeader: {
        title: 'Tables com header fixo',
        description:
          'Tables com pin header mantêm o header fixo ao rolar as linhas, melhorando a visibilidade das colunas.',
      },
    },
  },
  en: {
    title: 'Table',
    description: 'Tables can be used to display data in a structured format.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new table component.',
      },
      tables: {
        title: 'Tables',
        description:
          'Tables are a classic UI component that can be used to display data in a structured format. They are commonly used to organize information and improve navigation within an application.',
      },
      ordenableTable: {
        title: 'Ordenable Table',
        description:
          'Ordenable tables are a variation of the classic table component that allows users to sort columns by clicking on the column header. They are commonly used to improve the usability and interactivity of tables, allowing users to easily find and organize data.',
      },
      tablesZebra: {
        title: 'Tables zebra',
        description:
          'Zebra tables are a variation of the classic table component that alternates row colors for better readability. They are commonly used to improve the visual distinction between rows and enhance the overall user experience.',
      },
      tablesPinHeader: {
        title: 'Tables pin header',
        description:
          'Pin header tables are a variation of the classic table component where the header remains fixed while scrolling through the table rows. They are commonly used to improve the visibility of column headers and enhance the overall user experience.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type TablePageCopy = (typeof TABLE_PAGE)[Locale];
