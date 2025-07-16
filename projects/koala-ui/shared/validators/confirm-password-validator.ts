import { AbstractControl } from '@angular/forms';

export function ConfirmPasswordValidator(passwordControlName: string) {
  return (control: AbstractControl) => {
    if (control.parent?.get(passwordControlName)?.value !== control.value) {
      return { confirmPassword: true };
    }

    return null;
  };
}
