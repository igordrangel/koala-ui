import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';

export function formIsValid(form: FormGroup | FormControl) {
  return toSignal(form.valueChanges.pipe(map(() => form.valid)), { initialValue: form.valid });
}
