import { afterRenderEffect, Directive, ElementRef, inject, input } from '@angular/core';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({ selector: '[appInput]' })
export class Input {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);

  private get inputSizeClass() {
    switch (this.size()) {
      case 'xs':
        return 'input-xs';
      case 'sm':
        return 'input-sm';
      case 'md':
        return 'input-md';
      case 'lg':
        return 'input-lg';
      case 'xl':
        return 'input-xl';
    }
  }

  readonly size = input<InputSize>('md');
  readonly inline = input(false);

  constructor() {
    afterRenderEffect(() => {
      if (this.inline()) {
        this.elementRef.nativeElement.classList.add('outline-none');
        return;
      }

      this.elementRef.nativeElement.classList.add(
        'input',
        'validator',
        'bg-transparent',
        'w-full',
        this.inputSizeClass,
      );
    });
  }
}
