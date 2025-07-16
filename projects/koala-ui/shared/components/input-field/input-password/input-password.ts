import {
  booleanAttribute,
  Component,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldErrors } from '@koalarx/ui/shared/components/field-errors';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import { HasLowercaseValidator } from './has-lowercase-validator';
import { HasNumberValidator } from './has-number-validator';
import { HasSpecialCharactersValidator } from './has-special-characters-validator';
import { HasUppercaseValidator } from './has-uppercase-validator';
import { AppConfig } from '@koalarx/ui/core/config';

type InputPasswordType = 'password' | 'text';

@Component({
  selector: 'kl-input-password',
  templateUrl: './input-password.html',
  imports: [ReactiveFormsModule, FieldErrors],
})
export class InputPassword extends InputFieldBase implements OnInit {
  readonly translations = AppConfig.translation.form;

  type = signal<InputPasswordType>('password');
  enableStrongPasswordCheck = input(false, { transform: booleanAttribute });

  togglePasswordVisibility() {
    this.type.set(this.type() === 'password' ? 'text' : 'password');
  }

  ngOnInit(): void {
    if (this.enableStrongPasswordCheck()) {
      this.control().addValidators([
        HasSpecialCharactersValidator,
        HasLowercaseValidator,
        HasUppercaseValidator,
        HasNumberValidator,
        Validators.minLength(8),
      ]);
    }
  }
}
