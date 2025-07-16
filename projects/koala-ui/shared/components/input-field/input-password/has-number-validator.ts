import { AbstractControl } from '@angular/forms';

export function HasNumberValidator(control: AbstractControl) {
  if (!/\d/.test(control.value)) {
    return { hasNumber: true };
  }

  return null;
}
