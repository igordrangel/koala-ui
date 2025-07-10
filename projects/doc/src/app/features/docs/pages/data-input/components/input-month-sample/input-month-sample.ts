import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputMonth } from '@koalarx/ui/shared/components/input-field/input-month';
import { KlDate } from '@koalarx/utils/light/KlDate';
import { SampleContainer } from '../sample-container/sample-container';

@Component({
  selector: 'app-input-month-sample',
  templateUrl: './input-month-sample.html',
  imports: [SampleContainer, InputMonth],
})
export class InputMonthSample {
  min = new KlDate().format('yyyy-MM');
  max = new KlDate().add(1, 'years').format('yyyy-MM');

  form = inject(FormBuilder).group({
    month: [''],
  });
}
