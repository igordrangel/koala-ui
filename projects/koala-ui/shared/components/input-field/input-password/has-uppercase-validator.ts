import { AbstractControl } from '@angular/forms';

export function HasUppercaseValidator(control: AbstractControl) {
  if (!/[A-Z]/.test(control.value)) {
    return { hasUppercase: true };
  }

  return null;
}
