```typescript
import { Component, signal } from '@angular/core';
import { InputCalendar } from '@/shared/components/calendar';

@Component({
  selector: 'app-input-calendar-sample',
  templateUrl: './input-calendar-sample.html',
  imports: [InputCalendar],
})
export class CalendarSample {
  readonly inputDateValue = signal<string>('2026-01-01');
  readonly inputDateTimeValue = signal<string>('2026-01-01T14:30');
  readonly inputMonthValue = signal<string>('2026-01');
  readonly inputDateRangeValue = signal<string>('2026-01-10/2026-01-20');
}
```
