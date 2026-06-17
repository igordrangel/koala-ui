import { Directive, effect, ElementRef, inject, input } from '@angular/core';

export type LoadingVariant = 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';

export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({ selector: 'app-loading, [appLoading]' })
export class Loading {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  readonly variant = input<LoadingVariant>('spinner');
  readonly size = input<LoadingSize>('md');

  private get variantClass() {
    switch (this.variant()) {
      case 'spinner':
        return 'loading-spinner';
      case 'dots':
        return 'loading-dots';
      case 'ring':
        return 'loading-ring';
      case 'ball':
        return 'loading-ball';
      case 'bars':
        return 'loading-bars';
      case 'infinity':
        return 'loading-infinity';
    }
  }

  private get sizeClass() {
    switch (this.size()) {
      case 'xs':
        return 'loading-xs';
      case 'sm':
        return 'loading-sm';
      case 'md':
        return 'loading-md';
      case 'lg':
        return 'loading-lg';
      case 'xl':
        return 'loading-xl';
    }
  }

  constructor() {
    effect(() => {
      const button = this.elementRef.nativeElement;

      for (const key of button.classList) {
        if (key.startsWith('loading')) {
          button.classList.remove(key);
        }
      }

      button.classList.add('loading', this.variantClass, this.sizeClass);
    });
  }
}
