import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

export function controlChanges<T>(control: AbstractControl<T>): Signal<T> {
  return toSignal(control.valueChanges, { initialValue: control.value });
}
