import {
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  Injector,
  inject,
  input,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import type { ClassValue } from 'clsx';

export type RadioVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: 'input[type="radio"][appRadio]',
  host: {
    '(click)': 'handleClick($event)',
    '(keydown.space)': 'handleSpace($event)',
  },
})
export class Radio {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);
  private readonly injector = inject(Injector);
  private formDisabled = false;

  readonly appRadio = input<string>('');
  readonly class = input<ClassValue>('');
  readonly variant = input<RadioVariant>('neutral');
  readonly size = input<RadioSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });

  private get variantClass() {
    switch (this.variant()) {
      case 'neutral':
        return 'radio-neutral';
      case 'primary':
        return 'radio-primary';
      case 'secondary':
        return 'radio-secondary';
      case 'accent':
        return 'radio-accent';
      case 'info':
        return 'radio-info';
      case 'success':
        return 'radio-success';
      case 'warning':
        return 'radio-warning';
      case 'error':
        return 'radio-error';
    }
  }

  private get sizeClass() {
    switch (this.size()) {
      case 'xs':
        return 'radio-xs';
      case 'sm':
        return 'radio-sm';
      case 'md':
        return 'radio-md';
      case 'lg':
        return 'radio-lg';
      case 'xl':
        return 'radio-xl';
    }
  }

  constructor() {
    effect(() => {
      const radio = this.elementRef.nativeElement;
      const groupName = this.appRadio().trim();

      if (groupName) {
        radio.name = groupName;
      }

      for (const key of radio.classList) {
        if (key.startsWith('radio')) {
          radio.classList.remove(key);
        }
      }

      radio.classList.add('radio', this.variantClass, this.sizeClass);
      radio.classList.add(...this.class()!.toString().split(' ').filter(Boolean));
    });

    effect(() => {
      const radio = this.elementRef.nativeElement;
      radio.disabled = this.disabled() || this.formDisabled;
    });

    effect(() => {
      const control = this.injector.get(NgControl, null, { self: true, optional: true })?.control;
      this.formDisabled = control?.disabled ?? false;
      this.elementRef.nativeElement.disabled = this.disabled() || this.formDisabled;
    });
  }

  protected handleClick(event: MouseEvent) {
    const radio = this.elementRef.nativeElement;
    const control = this.injector.get(NgControl, null, { self: true, optional: true })?.control;
    const currentValue = control?.value;

    if (String(currentValue ?? '') !== radio.value) {
      return;
    }

    event.preventDefault();
    queueMicrotask(() => {
      control?.setValue(null);
      control?.markAsTouched();
      this.clearGroupSelection(radio);

      requestAnimationFrame(() => {
        this.clearGroupSelection(radio);
      });
    });
  }

  protected handleSpace(event: Event) {
    const radio = this.elementRef.nativeElement;
    const control = this.injector.get(NgControl, null, { self: true, optional: true })?.control;
    const currentValue = control?.value;

    if (String(currentValue ?? '') !== radio.value) {
      return;
    }

    event.preventDefault();
    queueMicrotask(() => {
      control?.setValue(null);
      control?.markAsTouched();
      this.clearGroupSelection(radio);

      requestAnimationFrame(() => {
        this.clearGroupSelection(radio);
      });
    });
  }

  private clearGroupSelection(currentRadio: HTMLInputElement) {
    currentRadio.checked = false;

    const scope =
      currentRadio.form ?? currentRadio.closest('form') ?? currentRadio.parentElement ?? document;

    const radios = Array.from(scope.querySelectorAll('input[type="radio"]')).filter(
      (element): element is HTMLInputElement =>
        element instanceof HTMLInputElement && element.name === currentRadio.name,
    );

    for (const radio of radios) {
      radio.checked = false;
    }
  }
}
