# Calendar

## Installation

```bash
kl install calendar
```

### HTML

```html
<app-calendar />
```

```typescript
import { Component } from '@angular/core';
import { Calendar } from '@/shared/components/calendar';

@Component({
  selector: 'app-calendar-sample',
  templateUrl: './calendar-sample.html',
  imports: [Calendar],
})
export class CalendarSample {}
```

### Input Calendar

```html
<div class="grid gap-4 md:grid-cols-2">
  <div class="flex flex-col gap-2">
    <span class="text-sm font-semibold">date</span>
    <app-input-calendar class="w-full" [formField]="calendarForm.date" />
    <span class="px-2 opacity-60">value: {{ calendarForm.date().value() }}</span>
  </div>

  <div class="flex flex-col gap-2">
    <span class="text-sm font-semibold">datetime</span>
    <app-input-calendar class="w-full" type="datetime" [formField]="calendarForm.datetime" />
    <span class="px-2 opacity-60">value: {{ calendarForm.datetime().value() }}</span>
  </div>

  <div class="flex flex-col gap-2">
    <span class="text-sm font-semibold">month</span>
    <app-input-calendar class="w-full" type="month" [formField]="calendarForm.month" />
    <span class="px-2 opacity-60">value: {{ calendarForm.month().value() }}</span>
  </div>

  <div class="flex flex-col gap-2">
    <span class="text-sm font-semibold">daterange</span>
    <app-input-calendar class="w-full" type="daterange" [formField]="calendarForm.daterange" />
    <span class="px-2 opacity-60">value: {{ calendarForm.daterange().value() }}</span>
  </div>
</div>
```

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
