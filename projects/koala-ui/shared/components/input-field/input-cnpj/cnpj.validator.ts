import { AbstractControl } from '@angular/forms';
import { validateCnpj } from '@koalarx/utils/KlString';

export function CNPJValidator(control: AbstractControl) {
  if (control.value && !validateCnpj(control.value)) {
    return { cnpjInvalid: true };
  }

  return null;
}
