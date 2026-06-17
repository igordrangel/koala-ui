import { booleanAttribute, Directive, effect, ElementRef, inject, input } from '@angular/core';
import type { ClassValue } from 'clsx';

export type ButtonVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({ selector: 'button[appButton], a[appButton]' })
export class Button {
  private readonly elementRef = inject<ElementRef<HTMLButtonElement>>(
    ElementRef<HTMLButtonElement>,
  );

  readonly class = input<ClassValue>('');
  readonly btnVariant = input<ButtonVariant>('neutral');
  readonly btnSize = input<ButtonSize>('md');
  readonly btnCircle = input(false, { transform: booleanAttribute });
  readonly btnOutline = input(false, { transform: booleanAttribute });
  readonly btnSoft = input(false, { transform: booleanAttribute });
  readonly btnDash = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  private get variantClass() {
    switch (this.btnVariant()) {
      case 'neutral':
        return 'btn-neutral';
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'accent':
        return 'btn-accent';
      case 'info':
        return 'btn-info';
      case 'success':
        return 'btn-success';
      case 'warning':
        return 'btn-warning';
      case 'error':
        return 'btn-error';
      case 'ghost':
        return 'btn-ghost';
    }
  }

  private get sizeClass() {
    switch (this.btnSize()) {
      case 'xs':
        return 'btn-xs';
      case 'sm':
        return 'btn-sm';
      case 'md':
        return 'btn-md';
      case 'lg':
        return 'btn-lg';
      case 'xl':
        return 'btn-xl';
    }
  }

  constructor() {
    effect(() => {
      const button = this.elementRef.nativeElement;

      for (const key of button.classList) {
        if (key.startsWith('btn')) {
          button.classList.remove(key);
        }
      }

      button.classList.add('btn', this.variantClass, this.sizeClass);

      if (this.btnCircle()) {
        button.classList.add('btn-circle');
      }
      if (this.btnOutline()) {
        button.classList.add('btn-outline');
      }
      if (this.btnSoft()) {
        button.classList.add('btn-soft');
      }
      if (this.btnDash()) {
        button.classList.add('btn-dash');
      }

      button.classList.add(...this.class()!.toString().split(' ').filter(Boolean));
    });

    effect(() => {
      const button = this.elementRef.nativeElement;
      button.disabled = this.disabled();
    });
  }
}
