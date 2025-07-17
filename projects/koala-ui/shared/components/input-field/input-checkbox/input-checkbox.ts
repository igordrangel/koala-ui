import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';

export type CheckboxColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost';

export type CheckboxSize =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge';

@Component({
  selector: 'kl-input-checkbox',
  templateUrl: './input-checkbox.html',
  imports: [ReactiveFormsModule],
})
export class InputCheckbox extends InputFieldBase {
  private readonly inputCheckboxElement =
    viewChild<ElementRef<HTMLInputElement>>('inputCheckbox');

  color = input<CheckboxColor>();
  size = input<CheckboxSize>();

  private getColorClass(): string {
    switch (this.color()) {
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
      case 'ghost':
        return 'checkbox-ghost';
      default:
        return 'checkbox';
    }
  }

  private getSizeClass(): string {
    switch (this.size()) {
      case 'extraSmall':
        return 'checkbox-xs';
      case 'small':
        return 'checkbox-sm';
      case 'medium':
        return 'checkbox-md';
      case 'large':
        return 'checkbox-lg';
      case 'extraLarge':
        return 'checkbox-xl';
      default:
        return 'checkbox';
    }
  }

  constructor() {
    super();

    effect(() => {
      const input = this.inputCheckboxElement()?.nativeElement;

      if (input) {
        input.classList.add(this.getColorClass());
      }
    });

    effect(() => {
      const input = this.inputCheckboxElement()?.nativeElement;

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
