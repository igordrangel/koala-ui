import { AbstractControl } from '@angular/forms';
import { validateCnpj } from '@koalarx/utils/KlString';

export function CnpjValidator(control: AbstractControl) {
  const value = control.value;

  if (!value) {
    return null;
  }

  if (!validateCnpj(value)) {
    return { cnpjInvalid: true };
  }

  return null;
}
