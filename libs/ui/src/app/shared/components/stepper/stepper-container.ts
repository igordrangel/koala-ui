import {
  afterRenderEffect,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

@Component({
  selector: 'app-stepper-container',
  templateUrl: './stepper-container.html',
})
export class StepperContainer {
  private readonly _currentStep = signal(0);
  private readonly _stepperContainer = inject<ElementRef<HTMLDivElement>>(
    ElementRef<HTMLDivElement>,
  );

  readonly orientation = input<StepperOrientation>('horizontal');
  readonly variant = input<StepperVariant>('primary');

  private get variantClass() {
    switch (this.variant()) {
      case 'neutral':
        return 'step-neutral';
      case 'primary':
        return 'step-primary';
      case 'secondary':
        return 'step-secondary';
      case 'accent':
        return 'step-accent';
      case 'info':
        return 'step-info';
      case 'success':
        return 'step-success';
      case 'warning':
        return 'step-warning';
      case 'error':
        return 'step-error';
    }
  }

  get currentStep() {
    return this._currentStep.asReadonly();
  }

  constructor() {
    effect(() => {
      const stepperContainer = this._stepperContainer.nativeElement;
      const currentStep = this._currentStep();

      const steps = stepperContainer.querySelectorAll<HTMLSpanElement>('.step');

      for (const [index, step] of steps.entries()) {
        const stepCounter = index + 1;

        if (stepCounter < currentStep) {
          step.dataset['content'] = '✓';
        } else {
          step.dataset['content'] = stepCounter.toString();
        }

        if (stepCounter <= currentStep) {
          step.classList.add(this.variantClass);
        } else {
          step.classList.remove(this.variantClass);
        }
      }
    });

    afterRenderEffect(() => {
      this._currentStep.set(1);
    });
  }

  next() {
    this._currentStep.update((step) => step + 1);
  }

  previous() {
    this._currentStep.update((step) => step - 1);
  }
}
