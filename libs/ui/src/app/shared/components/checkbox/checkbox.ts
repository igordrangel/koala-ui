import {
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';
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
  host: {
    '(change)': 'handleChange($event)',
    '(blur)': 'touch.emit()',
  },
})
export class Checkbox implements FormCheckboxControl {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);

  readonly checked = model(false);
  readonly class = input<ClassValue>('');
  readonly variant = input<CheckboxVariant>('neutral');
  readonly size = input<CheckboxSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

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
      button.disabled = this.disabled();
    });

    effect(() => {
      this.elementRef.nativeElement.checked = this.checked();
    });
  }

  protected handleChange(event: Event) {
    const checked = (event.target as HTMLInputElement | null)?.checked ?? false;
    this.checked.set(checked);
  }
}
