import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SortFilterType } from '@koalarx/ui/core/models';

@Directive({ selector: 'td[klSortedItem]' })
export class SortedItem {
  private readonly elementRef = inject<ElementRef<HTMLTableCellElement>>(
    ElementRef<HTMLTableCellElement>
  );

  klSortedItem = input.required<SortFilterType | null>();
  sortedPropName = input.required<string>();

  constructor() {
    effect(() => {
      const isSorted = this.klSortedItem()?.orderBy === this.sortedPropName();

      this.elementRef.nativeElement.classList.toggle('sorted', isSorted);

      if (isSorted) {
        this.elementRef.nativeElement.setAttribute('aria-sort', 'ascending');
      } else {
        this.elementRef.nativeElement.setAttribute('aria-sort', 'descending');
      }
    });
  }
}
