import { AbstractControl } from '@angular/forms';
import { validateCpf } from '@koalarx/utils/KlString';

export function CpfValidator(control: AbstractControl) {
  const value = control.value;

  if (!value) {
    return null;
  }

  if (!validateCpf(value)) {
    return { cpfInvalid: true };
  }

  return null;
}
