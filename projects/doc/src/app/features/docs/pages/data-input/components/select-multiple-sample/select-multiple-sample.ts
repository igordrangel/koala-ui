import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectBuilder } from '@koalarx/ui/shared/components/input-field/select';
import { SelectMultiple } from '@koalarx/ui/shared/components/input-field/select-multiple';

@Component({
  selector: 'app-select-multiple-sample',
  templateUrl: './select-multiple-sample.html',
  imports: [SampleContainer, SelectMultiple],
})
export class SelectMultipleSample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number[]>([1], Validators.required),
  });

  options = inject(SelectBuilder).inMemory([
    {
      label: 'Igor',
      value: 1,
      data: { id: 1, firstName: 'Igor' },
    },
    {
      label: 'John',
      value: 2,
      data: { id: 2, firstName: 'John' },
    },
    {
      label: 'Jane',
      value: 3,
      data: { id: 3, firstName: 'Jane' },
    },
  ]);
}
