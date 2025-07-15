import { Injectable, signal } from '@angular/core';

@Injectable()
export class Stepper {
  private readonly _currentStep = signal<number>(1);

  get currentStep() {
    return this._currentStep.asReadonly();
  }

  next() {
    this._currentStep.update((step) => step + 1);
  }

  previous() {
    this._currentStep.update((step) => (step > 1 ? step - 1 : step));
  }
}
