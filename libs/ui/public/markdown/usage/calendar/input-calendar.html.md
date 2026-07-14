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
