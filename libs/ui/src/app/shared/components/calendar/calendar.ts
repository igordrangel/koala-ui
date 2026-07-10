import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { KlDate } from '@koalarx/utils/KlDate';
import 'cally';
import { setupCalendarChangeEffect } from './effects/setup-calendar-change.effect';

export type CalendarType = 'date' | 'daterange';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Calendar {
  private readonly calendar = viewChild<ElementRef<HTMLElement & { value?: string }>>('calendar');

  readonly type = input<CalendarType>('date');
  readonly value = input<string>();
  readonly squareBottom = input<boolean>(false);
  readonly noBorder = input(false, { transform: booleanAttribute });
  readonly selectedDate = output<KlDate>();
  readonly selectedRange = output<string>();

  constructor() {
    setupCalendarChangeEffect({
      calendar: () => this.calendar(),
      type: () => this.type(),
      emitSelectedDate: (date) => this.selectedDate.emit(date),
      emitSelectedRange: (value) => this.selectedRange.emit(value),
    });
  }
}
