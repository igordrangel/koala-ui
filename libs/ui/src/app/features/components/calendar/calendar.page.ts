import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Calendar, InputCalendar } from '@/shared/components/calendar';
import { Tabs } from '@/shared/components/tabs';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar.page.html',
  imports: [FormField, Section, Tabs, Calendar, InputCalendar],
})
export class CalendarPage {
  private readonly docs = useDocsCopy('calendar');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly calendarModel = signal({
    date: '2026-01-01',
    datetime: '2026-01-01T14:30',
    month: '2026-01',
    daterange: '2026-01-10/2026-01-20',
  });
  readonly calendarForm = form(this.calendarModel);
}
