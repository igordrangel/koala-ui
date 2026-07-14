import { Select, SelectOption } from '@/shared/components/select';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-select-single-sample',
  template: `
    <app-select
      class="w-full"
      placeholder="Select an option"
      [options]="options"
      [formField]="selectForm.single"
    />
  `,
  imports: [FormField, Select],
})
export class SelectSingleSample {
  private readonly selectModel = signal<{ single: string | null }>({ single: null });
  readonly selectForm = form(this.selectModel);

  readonly options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];
}
