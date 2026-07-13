import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const CALENDAR_PAGE = {
  pt: {
    title: 'Calendar',
    description: 'Calendars podem ser usados para selecionar datas em um formulário.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente calendar.',
      },
      datePicker: {
        title: 'Date picker',
        description: 'O calendar também pode ser usado como date picker. Use a diretiva popover para exibir o calendar ao clicar em um campo. O demo de input-calendar abaixo inclui os modos date, datetime, month e daterange.',
      },
      calendar: {
        title: 'Calendar',
        description: 'O componente calendar é um date picker para selecionar datas em formulários. Ele usa a biblioteca Cally, com API simples e customizável.',
      },
    },
  },
  en: {
    title: 'Calendar',
    description: 'Calendars can be used to select dates in a form.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new calendar component.',
      },
      datePicker: {
        title: 'Date picker',
        description: 'The calendar component can also be used as a date picker. To do this, you can use the popover directive to display the calendar when the user clicks on an input field. The input-calendar demo below includes the date, datetime, month and daterange modes.',
      },
      calendar: {
        title: 'Calendar',
        description: 'The calendar component is a date picker that can be used to select dates in a form. It is built using the Cally library, which provides a simple and customizable API for creating date pickers.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type CalendarPageCopy = (typeof CALENDAR_PAGE)[Locale];
