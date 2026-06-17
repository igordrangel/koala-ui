import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { OrderBy } from './ordered-header-col';

@Directive({ selector: 'td[appTableOrderedBodyCol]' })
export class OrderedBodyCol {
  private readonly elementRef = inject<ElementRef<HTMLTableCellElement>>(
    ElementRef<HTMLTableCellElement>,
  );

  readonly appTableOrderedBodyCol = input.required<string>();
  readonly currentOrder = input<OrderBy | null>(null);

  constructor() {
    effect(() => {
      const sortBy = this.appTableOrderedBodyCol();
      const orderBy = this.currentOrder();

      if (sortBy && sortBy === orderBy?.field) {
        this.elementRef.nativeElement.classList.add('bg-base-200');
      } else {
        this.elementRef.nativeElement.classList.remove('bg-base-200');
      }
    });
  }
}
