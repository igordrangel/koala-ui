import { Component, input, output } from '@angular/core';
import { CalendarMonthOption, parseMonthValue } from '../input-calendar.helpers';

@Component({
  selector: 'app-input-calendar-month-picker',
  templateUrl: './input-calendar-month-picker.component.html',
})
export class InputCalendarMonthPickerComponent {
  readonly displayedYear = input.required<number>();
  readonly value = input('');
  readonly monthOptions = input.required<CalendarMonthOption[]>();

  readonly previousYear = output<void>();
  readonly nextYear = output<void>();
  readonly monthSelect = output<number>();

  isSelectedMonth(month: number): boolean {
    const monthValue = parseMonthValue(this.value());

    if (!monthValue) {
      return false;
    }

    return monthValue.year === this.displayedYear() && monthValue.month === month;
  }
}
