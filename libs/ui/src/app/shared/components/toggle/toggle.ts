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
  host: {
    '(change)': 'handleChange($event)',
    '(blur)': 'touch.emit()',
  },
})
export class Toggle implements FormCheckboxControl {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);

  readonly checked = model(false);
  readonly class = input<ClassValue>('');
  readonly variant = input<ToggleVariant>('neutral');
  readonly size = input<ToggleSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

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
      this.elementRef.nativeElement.disabled = this.disabled();
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
