import {
  Directive,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { stringMask } from '../utils/string-mask';

@Directive({
  selector: 'input[appMask],textarea[appMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Mask),
      multi: true,
    },
  ],
})
export class Mask implements ControlValueAccessor, OnDestroy {
  private readonly elementRef =
    inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);
  private readonly ngZone = inject(NgZone);
  private suppressEmit = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  private readonly onInput = () => {
    const input = this.elementRef.nativeElement;
    const value = input.value;
    const maskedValue = value ? stringMask(value, this.appMask()) : '';

    input.value = maskedValue;

    if (!this.suppressEmit) {
      this.ngZone.run(() => this.onChange(maskedValue));
    }
  };
  private readonly onBlur = () => {
    this.ngZone.run(() => this.onTouched());
  };

  readonly appMask = input.required<string>();

  constructor() {
    const input = this.elementRef.nativeElement;
    input.addEventListener('input', this.onInput);
    input.addEventListener('blur', this.onBlur);

    effect(() => {
      this.suppressEmit = true;
      input.value = input.value ? stringMask(input.value, this.appMask()) : '';
      this.suppressEmit = false;
    });
  }

  writeValue(value: string | null | undefined): void {
    const input = this.elementRef.nativeElement;
    this.suppressEmit = true;
    input.value = value ? stringMask(value, this.appMask()) : '';
    this.suppressEmit = false;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    const input = this.elementRef.nativeElement;
    input.removeEventListener('input', this.onInput);
    input.removeEventListener('blur', this.onBlur);
  }
}
