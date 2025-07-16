import { Component, effect } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  InputField,
  InputFieldBase,
} from '@koalarx/ui/shared/components/input-field';

@Component({
  selector: 'kl-input-email',
  templateUrl: './input-email.html',
  imports: [InputField],
})
export class InputEmail extends InputFieldBase {
  constructor() {
    super();

    effect(() => {
      const control = this.control();

      control.addValidators(Validators.email);
    });
  }
}
