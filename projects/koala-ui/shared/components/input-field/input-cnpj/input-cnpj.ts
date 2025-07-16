import { Component, effect } from '@angular/core';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import { InputText } from '@koalarx/ui/shared/components/input-field/input-text';
import { CNPJValidator } from './cnpj.validator';
import { AppConfig } from '@koalarx/ui/core/config';

@Component({
  selector: 'kl-input-cnpj',
  templateUrl: './input-cnpj.html',
  imports: [InputText],
})
export class InputCnpj extends InputFieldBase {
  readonly translations = AppConfig.translation.form;

  constructor() {
    super();

    effect(() => {
      const control = this.control();

      control.addValidators(CNPJValidator);
    });
  }
}
