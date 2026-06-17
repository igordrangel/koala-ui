import { AfterViewInit, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

@Directive({ selector: 'span[appValidatorHint]' })
export class ValidatorHint implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLSpanElement>>(ElementRef<HTMLSpanElement>);
  private inputElement: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null = null;

  private resolveInputElement() {
    const host = this.elementRef.nativeElement.closest('app-input-field');

    return (
      host?.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        '[appInput], input, textarea, select',
      ) ?? null
    );
  }

  private readonly onInput = (event: Event) => {
    setTimeout(() => {
      const input = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

      if (input.classList.contains('ng-invalid')) {
        input.classList.add('border-error');
        return;
      }

      input.classList.remove('border-error');
    });
  };

  ngAfterViewInit(): void {
    this.inputElement = this.resolveInputElement();
    this.inputElement?.addEventListener('input', this.onInput);
  }

  ngOnDestroy(): void {
    this.inputElement?.removeEventListener('input', this.onInput);
  }

  constructor() {
    this.elementRef.nativeElement.classList.add('validator-hint', 'visible', 'text-error');
  }
}
