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
import { FormValueControl } from '@angular/forms/signals';
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
  host: {
    '(input)': 'handleInput($event)',
    '(change)': 'handleInput($event)',
    '(blur)': 'touch.emit()',
  },
})
export class Range implements FormValueControl<number> {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);

  readonly value = model(0);
  readonly class = input<ClassValue>('');
  readonly variant = input<RangeVariant>('neutral');
  readonly size = input<RangeSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

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
      this.elementRef.nativeElement.disabled = this.disabled();
    });

    effect(() => {
      const nextValue = this.value();
      if (Number.isNaN(nextValue)) {
        return;
      }
      this.elementRef.nativeElement.value = String(nextValue);
    });
  }

  protected handleInput(event: Event) {
    const raw = (event.target as HTMLInputElement | null)?.valueAsNumber;
    this.value.set(Number.isNaN(raw) ? 0 : (raw ?? 0));
  }
}
