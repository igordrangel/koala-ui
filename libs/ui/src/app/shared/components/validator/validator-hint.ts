import { Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: 'span[appValidatorHint]' })
export class ValidatorHint {
  private readonly elementRef = inject<ElementRef<HTMLSpanElement>>(ElementRef<HTMLSpanElement>);

  constructor() {
    this.elementRef.nativeElement.classList.add(
      'validator-hint',
      'visible',
      'hidden',
      'text-error',
    );
  }
}
