import { Directive, effect, ElementRef, inject, input } from '@angular/core';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Directive({ selector: '[tooltip]' })
export class Tooltip {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(
    ElementRef<HTMLElement>
  );

  tooltip = input.required<string>();
  tooltipPosition = input<TooltipPosition>('top');

  constructor() {
    effect(() => {
      const element = this.elementRef.nativeElement;
      const tooltipText = this.tooltip();

      element.classList.add('tooltip');
      element.dataset['tip'] = tooltipText;

      switch (this.tooltipPosition()) {
        case 'top':
          element.classList.add('tooltip-top');
          break;
        case 'bottom':
          element.classList.add('tooltip-bottom');
          break;
        case 'left':
          element.classList.add('tooltip-left');
          break;
        case 'right':
          element.classList.add('tooltip-right');
          break;
      }
    });
  }
}
