import { Directive, effect, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[appStep]' })
export class Step {
  private readonly elementRef = inject<ElementRef<HTMLButtonElement>>(
    ElementRef<HTMLButtonElement>,
  );

  constructor() {
    effect(() => {
      const step = this.elementRef.nativeElement;

      step.classList.add('step');
    });
  }
}
