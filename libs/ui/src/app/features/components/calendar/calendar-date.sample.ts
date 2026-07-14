import { InputCalendar } from '@/shared/components/calendar';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-calendar-date-sample',
  template: `
    <div class="flex flex-col gap-2">
      <span class="text-sm font-semibold">date</span>
      <app-input-calendar class="w-full" [formField]="calendarForm.date" />
      <span class="px-2 text-xs opacity-60">value: {{ calendarForm.date().value() }}</span>
    </div>
  `,
  imports: [FormField, InputCalendar],
})
export class CalendarDateSample {
  private readonly calendarModel = signal({ date: '2026-01-01' });
  readonly calendarForm = form(this.calendarModel);
}
