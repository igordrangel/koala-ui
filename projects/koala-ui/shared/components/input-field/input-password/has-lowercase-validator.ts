import { AbstractControl } from '@angular/forms';

export function HasLowercaseValidator(control: AbstractControl) {
  if (!/[a-z]/.test(control.value)) {
    return { hasLowercase: true };
  }

  return null;
}
