import { AbstractControl } from '@angular/forms';
import { validateCpf } from '@koalarx/utils/KlString';

export function CPFValidator(control: AbstractControl) {
  if (control.value && !validateCpf(control.value)) {
    return { cpfInvalid: true };
  }

  return null;
}
