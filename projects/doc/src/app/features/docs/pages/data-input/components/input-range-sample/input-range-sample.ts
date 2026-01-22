import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputRange } from '@koalarx/ui/shared/components/input-field/range';

@Component({
  selector: 'app-input-range-sample',
  templateUrl: './input-range-sample.html',
  imports: [SampleContainer, InputRange],
})
export class InputRangeSample {
  form = inject(FormBuilder).group({
    range: [5],
  });
}
