import {
  booleanAttribute,
  Component,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';

export type RadioColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost';

export type RadioSize =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge';

@Component({
  selector: 'kl-input-radio',
  templateUrl: './input-radio.html',
  imports: [ReactiveFormsModule],
})
export class InputRadio extends InputFieldBase {
  private readonly inputRadioElement =
    viewChild<ElementRef<HTMLInputElement>>('inputRadio');

  color = input<RadioColor>();
  size = input<RadioSize>();
  name = input.required<string>();
  value = input.required<string | number>();
  disableAutoTypeConversion = input(false, { transform: booleanAttribute });

  private getColorClass(): string {
    switch (this.color()) {
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
      case 'ghost':
        return 'radio-ghost';
      default:
        return 'radio';
    }
  }

  private getSizeClass(): string {
    switch (this.size()) {
      case 'extraSmall':
        return 'radio-xs';
      case 'small':
        return 'radio-sm';
      case 'medium':
        return 'radio-md';
      case 'large':
        return 'radio-lg';
      case 'extraLarge':
        return 'radio-xl';
      default:
        return 'radio';
    }
  }

  constructor() {
    super();

    effect(() => {
      const input = this.inputRadioElement()?.nativeElement;

      if (input) {
        input.classList.add(this.getColorClass());
      }
    });

    effect(() => {
      const input = this.inputRadioElement()?.nativeElement;

      if (input) {
        input.classList.add(this.getSizeClass());
      }
    });
  }

  toggle(event: Event) {
    const target = event.target as HTMLInputElement;

    let value: string | number = target.value;

    if (
      !Number.isNaN(parseInt(value as any)) &&
      !/^0+[1-9]\d*$/.test(value) &&
      !this.disableAutoTypeConversion()
    ) {
      value = Number(value);
    }

    this.control().setValue(value);
  }
}
