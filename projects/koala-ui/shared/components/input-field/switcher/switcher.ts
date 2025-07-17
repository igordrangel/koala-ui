import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';

export type SwitcherColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost';

export type SwitcherSize =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge';

@Component({
  selector: 'kl-switcher',
  templateUrl: './switcher.html',
  imports: [ReactiveFormsModule],
})
export class Switcher extends InputFieldBase {
  private readonly switcherElement =
    viewChild<ElementRef<HTMLInputElement>>('inputSwitcher');

  color = input<SwitcherColor>();
  size = input<SwitcherSize>();

  private getColorClass(): string {
    switch (this.color()) {
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
      case 'ghost':
        return 'toggle-ghost';
      default:
        return 'toggle';
    }
  }

  private getSizeClass(): string {
    switch (this.size()) {
      case 'extraSmall':
        return 'toggle-xs';
      case 'small':
        return 'toggle-sm';
      case 'medium':
        return 'toggle-md';
      case 'large':
        return 'toggle-lg';
      case 'extraLarge':
        return 'toggle-xl';
      default:
        return 'toggle';
    }
  }

  constructor() {
    super();

    effect(() => {
      const input = this.switcherElement()?.nativeElement;

      if (input) {
        input.classList.add(this.getColorClass());
      }
    });

    effect(() => {
      const input = this.switcherElement()?.nativeElement;

      if (input) {
        input.classList.add(this.getSizeClass());
      }
    });
  }

  toggle(event: Event) {
    const target = event.target as HTMLInputElement;
    this.control().setValue(target.checked);
  }
}
