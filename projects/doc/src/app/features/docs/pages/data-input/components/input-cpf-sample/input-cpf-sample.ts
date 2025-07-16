import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputCpf } from '@koalarx/ui/shared/components/input-field/input-cpf';

@Component({
  selector: 'app-input-cpf-sample',
  templateUrl: './input-cpf-sample.html',
  imports: [SampleContainer, InputCpf],
})
export class InputCpfSample {
  cpfControl = new FormControl(null, Validators.required);
}
