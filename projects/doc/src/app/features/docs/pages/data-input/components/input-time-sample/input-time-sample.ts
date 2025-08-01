import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputTime } from '@koalarx/ui/shared/components/input-field/input-time';
import { KlDate } from '@koalarx/utils/light/KlDate';

@Component({
  selector: 'app-input-time-sample',
  templateUrl: './input-time-sample.html',
  imports: [SampleContainer, InputTime],
})
export class InputTimeSample {
  min = new KlDate().format('HH:mm');
  max = new KlDate().add(3, 'hours').format('HH:mm');

  form = inject(FormBuilder).group({
    time: [''],
  });
}
