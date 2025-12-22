import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  Select,
  SelectBuilder,
} from '@koalarx/ui/shared/components/input-field/select';

@Component({
  selector: 'app-select-in-memory-sample',
  templateUrl: './select-in-memory-sample.html',
  imports: [SampleContainer, Select],
})
export class SelectInMemorySample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number>(1, Validators.required),
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
