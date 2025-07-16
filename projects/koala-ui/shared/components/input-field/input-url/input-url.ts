import { Component, effect } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppConfig } from '@koalarx/ui/core/config';
import {
  InputField,
  InputFieldBase,
} from '@koalarx/ui/shared/components/input-field';

@Component({
  selector: 'kl-input-url',
  templateUrl: './input-url.html',
  imports: [InputField],
})
export class InputUrl extends InputFieldBase {
  readonly translations = AppConfig.translation.form;

  constructor() {
    super();

    effect(() => {
      const control = this.control();

      control.addValidators(
        Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/)
      );
    });
  }
}
