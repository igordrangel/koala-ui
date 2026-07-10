import { effect, ElementRef } from '@angular/core';
import { KlDate } from '@koalarx/utils/KlDate';
import type { CalendarType } from '..';

interface SetupCalendarChangeEffectParams {
  calendar: () => ElementRef<HTMLElement & { value?: string }> | undefined;
  type: () => CalendarType;
  emitSelectedDate: (date: KlDate) => void;
  emitSelectedRange: (value: string) => void;
}

function bindEvent(
  element: HTMLElement,
  eventName: string,
  handler: EventListener,
  onCleanup: (cleanupFn: () => void) => void,
) {
  element.addEventListener(eventName, handler);
  onCleanup(() => element.removeEventListener(eventName, handler));
}

export function setupCalendarChangeEffect(params: SetupCalendarChangeEffectParams): void {
  const onDateChange = (event: CustomEvent<Date>) => {
    if (params.type() !== 'date') {
      return;
    }

    const date = new KlDate(event.detail);
    date.add(1, 'days').setHours(0, 0, 0, 0);
    params.emitSelectedDate(date);
  };

  const onRangeChange = (event: Event) => {
    if (params.type() !== 'daterange') {
      return;
    }

    const value = (event.target as HTMLInputElement | null)?.value;

    if (value) {
      params.emitSelectedRange(value);
    }
  };

  effect((onCleanup) => {
    const calendar = params.calendar()?.nativeElement;

    if (!calendar) {
      return;
    }

    if (params.type() === 'daterange') {
      bindEvent(calendar, 'change', onRangeChange as EventListener, onCleanup);
      return;
    }

    bindEvent(calendar, 'focusday', onDateChange as EventListener, onCleanup);
  });
}
