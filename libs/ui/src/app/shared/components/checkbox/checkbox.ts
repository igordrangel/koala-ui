import {
  booleanAttribute,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  Injector,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import type { ClassValue } from 'clsx';

export type CheckboxVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: 'input[type="checkbox"][appCheckbox]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
})
export class Checkbox implements ControlValueAccessor, OnInit {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};
  private formDisabled = false;

  readonly class = input<ClassValue>('');
  readonly variant = input<CheckboxVariant>('neutral');
  readonly size = input<CheckboxSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });

  private get variantClass() {
    switch (this.variant()) {
      case 'neutral':
        return 'checkbox-neutral';
      case 'primary':
        return 'checkbox-primary';
      case 'secondary':
        return 'checkbox-secondary';
      case 'accent':
        return 'checkbox-accent';
      case 'info':
        return 'checkbox-info';
      case 'success':
        return 'checkbox-success';
      case 'warning':
        return 'checkbox-warning';
      case 'error':
        return 'checkbox-error';
    }
  }

  private get sizeClass() {
    switch (this.size()) {
      case 'xs':
        return 'checkbox-xs';
      case 'sm':
        return 'checkbox-sm';
      case 'md':
        return 'checkbox-md';
      case 'lg':
        return 'checkbox-lg';
      case 'xl':
        return 'checkbox-xl';
    }
  }

  constructor() {
    effect(() => {
      const button = this.elementRef.nativeElement;

      for (const key of button.classList) {
        if (key.startsWith('checkbox')) {
          button.classList.remove(key);
        }
      }

      button.classList.add('checkbox', this.variantClass, this.sizeClass);
      button.classList.add(...this.class()!.toString().split(' ').filter(Boolean));
    });

    effect(() => {
      const button = this.elementRef.nativeElement;
      button.disabled = this.disabled() || this.formDisabled;
    });
  }

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
    const control = ngControl?.control;

    if (!control) {
      return;
    }

    control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.elementRef.nativeElement.checked = Boolean(value);
    });
  }

  @HostListener('change', ['$event'])
  protected handleChange(event: Event) {
    const checked = (event.target as HTMLInputElement | null)?.checked ?? false;
    this.onChange(checked);
  }

  @HostListener('blur')
  protected handleBlur() {
    this.onTouched();
  }

  writeValue(value: unknown): void {
    this.elementRef.nativeElement.checked = Boolean(value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled = isDisabled;
    this.elementRef.nativeElement.disabled = this.disabled() || this.formDisabled;
  }
}
