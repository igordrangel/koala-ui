import {
  booleanAttribute,
  Directive,
  effect,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { randomString } from '@koalarx/utils/KlString';

@Directive()
export abstract class InputFieldBase {
  private readonly required = signal(false);
  protected readonly isDisabled = linkedSignal(() => this.disabled());
  protected readonly isRequired = this.required.asReadonly();
  protected readonly fieldId = randomString(10, {
    lowercase: true,
    uppercase: true,
  });

  control = input.required<FormControl>();
  label = input<string>('');
  placeholder = input<string>('');
  disabled = input(false, { transform: booleanAttribute });

  constructor() {
    effect(() => this.checkIsRequired(this.control()));
  }

  private checkIsRequired(control: FormControl) {
    this.required.set(control.hasValidator(Validators.required));
  }
}
