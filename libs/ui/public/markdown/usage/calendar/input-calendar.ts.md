```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { InputCalendar } from '@/shared/components/calendar';

@Component({
  selector: 'app-input-calendar-sample',
  templateUrl: './input-calendar-sample.html',
  imports: [FormField, InputCalendar],
})
export class CalendarSample {
  private readonly calendarModel = signal({
    date: '2026-01-01',
    datetime: '2026-01-01T14:30',
    month: '2026-01',
    daterange: '2026-01-10/2026-01-20',
  });
  readonly calendarForm = form(this.calendarModel);
}
```

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
