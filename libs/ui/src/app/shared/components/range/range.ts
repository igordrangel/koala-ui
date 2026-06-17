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

export type RangeVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type RangeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: 'input[type="range"][appRange]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Range),
      multi: true,
    },
  ],
})
export class Range implements ControlValueAccessor, OnInit {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};
  private formDisabled = false;

  readonly class = input<ClassValue>('');
  readonly variant = input<RangeVariant>('neutral');
  readonly size = input<RangeSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });

  private get variantClass() {
    switch (this.variant()) {
      case 'neutral':
        return 'range-neutral';
      case 'primary':
        return 'range-primary';
      case 'secondary':
        return 'range-secondary';
      case 'accent':
        return 'range-accent';
      case 'info':
        return 'range-info';
      case 'success':
        return 'range-success';
      case 'warning':
        return 'range-warning';
      case 'error':
        return 'range-error';
    }
  }

  private get sizeClass() {
    switch (this.size()) {
      case 'xs':
        return 'range-xs';
      case 'sm':
        return 'range-sm';
      case 'md':
        return 'range-md';
      case 'lg':
        return 'range-lg';
      case 'xl':
        return 'range-xl';
    }
  }

  constructor() {
    effect(() => {
      const range = this.elementRef.nativeElement;

      for (const key of range.classList) {
        if (key.startsWith('range')) {
          range.classList.remove(key);
        }
      }

      range.classList.add('range', this.variantClass, this.sizeClass);
      range.classList.add(...this.class()!.toString().split(' ').filter(Boolean));
    });

    effect(() => {
      const range = this.elementRef.nativeElement;
      range.disabled = this.disabled() || this.formDisabled;
    });
  }

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
    const control = ngControl?.control;

    if (!control) {
      return;
    }

    control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.writeValue(value);
    });
  }

  @HostListener('input', ['$event'])
  protected handleInput(event: Event) {
    const value = (event.target as HTMLInputElement | null)?.valueAsNumber;
    this.onChange(Number.isNaN(value) ? 0 : (value ?? 0));
  }

  @HostListener('change', ['$event'])
  protected handleChange(event: Event) {
    const value = (event.target as HTMLInputElement | null)?.valueAsNumber;
    this.onChange(Number.isNaN(value) ? 0 : (value ?? 0));
  }

  @HostListener('blur')
  protected handleBlur() {
    this.onTouched();
  }

  writeValue(value: unknown): void {
    const range = this.elementRef.nativeElement;
    const nextValue = Number(value);

    if (Number.isNaN(nextValue)) {
      return;
    }

    range.value = String(nextValue);
  }

  registerOnChange(fn: (value: number) => void): void {
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
