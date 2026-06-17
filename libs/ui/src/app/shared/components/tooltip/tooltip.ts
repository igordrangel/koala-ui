import { Directive, effect, ElementRef, inject, input } from '@angular/core';

export type TooltipVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

@Directive({ selector: '[appTooltip]' })
export class Tooltip {
  private readonly elementRef = inject<ElementRef<HTMLButtonElement>>(
    ElementRef<HTMLButtonElement>,
  );

  readonly appTooltip = input.required<string>();
  readonly tooltipVariant = input<TooltipVariant>('neutral');
  readonly tooltipPosition = input<TooltipPosition>('top');

  private get variantClass() {
    switch (this.tooltipVariant()) {
      case 'neutral':
        return 'tooltip-neutral';
      case 'primary':
        return 'tooltip-primary';
      case 'secondary':
        return 'tooltip-secondary';
      case 'accent':
        return 'tooltip-accent';
      case 'info':
        return 'tooltip-info';
      case 'success':
        return 'tooltip-success';
      case 'warning':
        return 'tooltip-warning';
      case 'error':
        return 'tooltip-error';
    }
  }

  private get positionClass() {
    switch (this.tooltipPosition()) {
      case 'top':
        return 'tooltip-top';
      case 'right':
        return 'tooltip-right';
      case 'bottom':
        return 'tooltip-bottom';
      case 'left':
        return 'tooltip-left';
    }
  }

  constructor() {
    effect(() => {
      const tooltip = this.elementRef.nativeElement;

      for (const key of tooltip.classList) {
        if (key.startsWith('tooltip')) {
          tooltip.classList.remove(key);
        }
      }

      tooltip.classList.add('tooltip', this.variantClass, this.positionClass);
      tooltip.dataset['tip'] = this.appTooltip();
    });
  }
}
