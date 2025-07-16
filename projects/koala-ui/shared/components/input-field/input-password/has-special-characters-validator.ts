import { AbstractControl } from '@angular/forms';

export function HasSpecialCharactersValidator(control: AbstractControl) {
  if (!/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(control.value)) {
    return { hasSpecialCharacters: true };
  }

  return null;
}
