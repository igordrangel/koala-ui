import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { stringMask } from '../utils/string-mask';

@Directive({
  selector: 'input[appMask],textarea[appMask]',
  host: {
    '(blur)': 'touch.emit()',
  },
})
export class Mask implements FormValueControl<string>, OnDestroy {
  private readonly elementRef =
    inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);
  private suppressEmit = false;

  readonly value = model('');
  readonly appMask = input.required<string>();
  readonly disabled = input(false);
  readonly touch = output<void>();

  private readonly onInput = () => {
    const el = this.elementRef.nativeElement;
    const maskedValue = el.value ? stringMask(el.value, this.appMask()) : '';
    el.value = maskedValue;

    if (!this.suppressEmit) {
      this.value.set(maskedValue);
    }
  };

  constructor() {
    const el = this.elementRef.nativeElement;
    el.addEventListener('input', this.onInput);

    effect(() => {
      const masked = this.value() ? stringMask(this.value(), this.appMask()) : '';
      if (el.value === masked) {
        return;
      }
      this.suppressEmit = true;
      el.value = masked;
      this.suppressEmit = false;
    });

    effect(() => {
      el.disabled = this.disabled();
    });
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener('input', this.onInput);
  }
}
