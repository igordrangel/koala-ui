import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputText } from '@koalarx/ui/shared/components/input-field/input-text';
import { SampleContainer } from '../sample-container/sample-container';

@Component({
  selector: 'app-input-text-sample',
  templateUrl: './input-text-sample.html',
  imports: [SampleContainer, InputText],
})
export class InputTextSample {
  form = inject(FormBuilder).group({
    text: [''],
  });
}
