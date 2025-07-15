import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputDate } from '@koalarx/ui/shared/components/input-field/input-date';
import { KlDate } from '@koalarx/utils/light/KlDate';

@Component({
  selector: 'app-input-date-sample',
  templateUrl: './input-date-sample.html',
  imports: [SampleContainer, InputDate],
})
export class InputDateSample {
  min = new KlDate().format('yyyy-MM-dd');
  max = new KlDate().add(1, 'years').format('yyyy-MM-dd');

  form = inject(FormBuilder).group({
    date: [''],
  });
}
