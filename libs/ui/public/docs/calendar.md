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
    <app-input-calendar class="w-full" [(value)]="inputDateValue" />
    <span class="px-2 opacity-60">value: {{ inputDateValue() }}</span>
  </div>

  <div class="flex flex-col gap-2">
    <span class="text-sm font-semibold">datetime</span>
    <app-input-calendar class="w-full" type="datetime" [(value)]="inputDateTimeValue" />
    <span class="px-2 opacity-60">value: {{ inputDateTimeValue() }}</span>
  </div>

  <div class="flex flex-col gap-2">
    <span class="text-sm font-semibold">month</span>
    <app-input-calendar class="w-full" type="month" [(value)]="inputMonthValue" />
    <span class="px-2 opacity-60">value: {{ inputMonthValue() }}</span>
  </div>

  <div class="flex flex-col gap-2">
    <span class="text-sm font-semibold">daterange</span>
    <app-input-calendar class="w-full" type="daterange" [(value)]="inputDateRangeValue" />
    <span class="px-2 opacity-60">value: {{ inputDateRangeValue() }}</span>
  </div>
</div>
```

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

### TypeScript

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
