import { Component, effect } from '@angular/core';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import { InputText } from '@koalarx/ui/shared/components/input-field/input-text';
import { CPFValidator } from './cpf.validator';

@Component({
  selector: 'kl-input-cpf',
  templateUrl: './input-cpf.html',
  imports: [InputText],
})
export class InputCpf extends InputFieldBase {
  constructor() {
    super();

    effect(() => {
      const control = this.control();

      control.addValidators(CPFValidator);
    });
  }
}
