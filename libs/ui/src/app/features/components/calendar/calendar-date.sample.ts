import { InputCalendar } from '@/shared/components/calendar';
import { controlChanges } from '@/shared/utils/control-changes';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-date-sample',
  template: `
    <div class="flex flex-col gap-2">
      <span class="text-sm font-semibold">date</span>
      <app-input-calendar class="w-full" [formControl]="formDate.controls.date" />
      <span class="px-2 text-xs opacity-60">value: {{ dateValue() }}</span>
    </div>
  `,
  imports: [ReactiveFormsModule, InputCalendar],
})
export class CalendarDateSample {
  readonly formDate = inject(FormBuilder).group({
    date: new FormControl<string>('2026-01-01'),
  });

  readonly dateValue = controlChanges(this.formDate.controls.date);
}
