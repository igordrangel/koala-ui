import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputCnpj } from '@koalarx/ui/shared/components/input-field/input-cnpj';

@Component({
  selector: 'app-input-cnpj-sample',
  templateUrl: './input-cnpj-sample.html',
  imports: [SampleContainer, InputCnpj],
})
export class InputCnpjSample {
  cnpjControl = new FormControl(null, Validators.required);
}
