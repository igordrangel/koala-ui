import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Calendar, InputCalendar } from '@/shared/components/calendar';
import { Tabs } from '@/shared/components/tabs';
import { controlChanges } from '@/shared/utils/control-changes';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar.page.html',
  imports: [ReactiveFormsModule, Section, Tabs, Calendar, InputCalendar],
})
export class CalendarPage {
  private readonly docs = useDocsCopy('calendar');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  formDate = inject(FormBuilder).group({
    date: new FormControl<string>('2026-01-01'),
    datetime: new FormControl<string>('2026-01-01T14:30'),
    month: new FormControl<string>('2026-01'),
    daterange: new FormControl<string>('2026-01-10/2026-01-20'),
  });

  readonly dateValue = controlChanges(this.formDate.controls.date);
  readonly datetimeValue = controlChanges(this.formDate.controls.datetime);
  readonly monthValue = controlChanges(this.formDate.controls.month);
  readonly daterangeValue = controlChanges(this.formDate.controls.daterange);
}
