import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export type RangeColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost';

export type RangeSize =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge';

@Component({
  selector: 'kl-input-range',
  templateUrl: './input-range.html',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRange {
  private destroyRef = inject(DestroyRef);

  control = input.required<FormControl>();
  min = input.required<number>();
  max = input.required<number>();
  step = input.required<number>();
  hint = input<string>('');
  color = input<RangeColor>();
  size = input<RangeSize>();

  colorClass = computed(() => {
    switch (this.color()) {
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
      case 'ghost':
        return 'range-ghost';
      default:
        return 'range';
    }
  });

  sizeClass = computed(() => {
    switch (this.size()) {
      case 'extraSmall':
        return 'range-xs';
      case 'small':
        return 'range-sm';
      case 'medium':
        return 'range-md';
      case 'large':
        return 'range-lg';
      case 'extraLarge':
        return 'range-xl';
      default:
        return '';
    }
  });

  steps = computed(() => {
    const stepArray = [];

    if (this.step() > 0) {
      for (let i = this.min(); i <= this.max(); i += this.step()) {
        stepArray.push(i);
      }
    }

    return stepArray;
  });

  value = linkedSignal(() => this.control().value);

  constructor() {
    afterRenderEffect(() => {
      this.control()
        .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          this.value.set(value);
        });
    });
  }

  setValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.control().setValue(target.value);
  }
}
