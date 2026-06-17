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

export type ToggleVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: 'input[type="checkbox"][appToggle]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Toggle),
      multi: true,
    },
  ],
})
export class Toggle implements ControlValueAccessor, OnInit {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};
  private formDisabled = false;

  readonly class = input<ClassValue>('');
  readonly variant = input<ToggleVariant>('neutral');
  readonly size = input<ToggleSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });

  private get variantClass() {
    switch (this.variant()) {
      case 'neutral':
        return 'toggle-neutral';
      case 'primary':
        return 'toggle-primary';
      case 'secondary':
        return 'toggle-secondary';
      case 'accent':
        return 'toggle-accent';
      case 'info':
        return 'toggle-info';
      case 'success':
        return 'toggle-success';
      case 'warning':
        return 'toggle-warning';
      case 'error':
        return 'toggle-error';
    }
  }

  private get sizeClass() {
    switch (this.size()) {
      case 'xs':
        return 'toggle-xs';
      case 'sm':
        return 'toggle-sm';
      case 'md':
        return 'toggle-md';
      case 'lg':
        return 'toggle-lg';
      case 'xl':
        return 'toggle-xl';
    }
  }

  constructor() {
    effect(() => {
      const button = this.elementRef.nativeElement;

      for (const key of button.classList) {
        if (key.startsWith('toggle')) {
          button.classList.remove(key);
        }
      }

      button.classList.add('toggle', this.variantClass, this.sizeClass);
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
