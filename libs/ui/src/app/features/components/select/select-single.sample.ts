import { Select, SelectOption } from '@/shared/components/select';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-single-sample',
  template: `
    <app-select
      class="w-full"
      placeholder="Select an option"
      [options]="options"
      [formControl]="singleControl"
    />
  `,
  imports: [ReactiveFormsModule, Select],
})
export class SelectSingleSample {
  readonly singleControl = new FormControl<string | null>(null);

  readonly options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];
}
