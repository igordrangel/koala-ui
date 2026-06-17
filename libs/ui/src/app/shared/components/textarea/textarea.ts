import {
  afterRenderEffect,
  booleanAttribute,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';

export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({ selector: '[appTextarea]' })
export class Textarea {
  private readonly elementRef = inject<ElementRef<HTMLTextAreaElement>>(
    ElementRef<HTMLTextAreaElement>,
  );

  private get inputSizeClass() {
    switch (this.size()) {
      case 'xs':
        return 'textarea-xs';
      case 'sm':
        return 'textarea-sm';
      case 'md':
        return 'textarea-md';
      case 'lg':
        return 'textarea-lg';
      case 'xl':
        return 'textarea-xl';
    }
  }

  readonly size = input<TextareaSize>('md');
  readonly resizable = input(false, { transform: booleanAttribute });

  constructor() {
    afterRenderEffect(() => {
      this.elementRef.nativeElement.classList.add(
        'textarea',
        'w-full',
        'bg-transparent',
        'validator',
        this.resizable() ? 'resize' : 'resize-none',
        this.inputSizeClass,
      );
    });
  }
}
