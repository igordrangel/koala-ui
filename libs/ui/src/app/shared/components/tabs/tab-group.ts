import { computed, Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({ selector: '[appTabGroup]' })
export class TabGroup {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly align = input<'start' | 'center' | 'end'>('center');
  readonly alignClass = computed(() => {
    switch (this.align()) {
      case 'start':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'end':
        return 'justify-end';
    }
  });

  constructor() {
    this.elementRef.nativeElement.classList.add('tabs', 'tabs-lift', 'w-full');

    effect(() => {
      const element = this.elementRef.nativeElement;

      element.classList.remove('justify-start', 'justify-center', 'justify-end');
      element.classList.add(this.alignClass());
    });
  }
}
