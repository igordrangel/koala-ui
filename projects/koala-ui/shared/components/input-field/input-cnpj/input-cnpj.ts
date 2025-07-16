import { Component, effect } from '@angular/core';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import { InputText } from '@koalarx/ui/shared/components/input-field/input-text';
import { CNPJValidator } from './cnpj.validator';

@Component({
  selector: 'kl-input-cnpj',
  templateUrl: './input-cnpj.html',
  imports: [InputText],
})
export class InputCnpj extends InputFieldBase {
  constructor() {
    super();

    effect(() => {
      const control = this.control();

      control.addValidators(CNPJValidator);
    });
  }
}
