import { FormControl } from '@angular/forms';

export function getValueOnFirstChange<T>(control: FormControl<T>, callback: (value: T) => void) {
  if (control.value !== null && control.value !== undefined) {
    callback(control.value);
    return;
  }

  const subscription = control.valueChanges.subscribe((value) => {
    callback(value);
    subscription.unsubscribe();
  });
}
