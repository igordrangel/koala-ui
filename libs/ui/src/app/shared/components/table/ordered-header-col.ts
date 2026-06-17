import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  WritableSignal,
} from '@angular/core';

export type OrderDirection = 'asc' | 'desc';
export interface OrderBy {
  field: string;
  direction: OrderDirection;
}

@Directive({ selector: 'th[appTableOrderedHeaderCol]' })
export class OrderedHeaderCol implements OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLTableColElement>>(
    ElementRef<HTMLTableColElement>,
  );
  readonly orderBy = input.required<WritableSignal<OrderBy | null>>();
  readonly appTableOrderedHeaderCol = input.required<string>();
  readonly direction = input<OrderDirection>('asc');

  onClick = () => {
    this.orderBy().update((current) => {
      const field = this.appTableOrderedHeaderCol();

      let direction: OrderDirection = this.direction();

      if (current) {
        direction =
          current.field === field ? (current.direction === 'asc' ? 'desc' : 'asc') : 'asc';
      }

      return { field, direction };
    });
  };

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener('click', this.onClick);
  }

  constructor() {
    this.elementRef.nativeElement.addEventListener('click', this.onClick);
    this.elementRef.nativeElement.classList.add('cursor-pointer');

    effect(() => {
      const sortBy = this.appTableOrderedHeaderCol();
      const orderBy = this.orderBy()();

      this.updateSortIcon(orderBy);

      if (sortBy && sortBy === orderBy?.field) {
        this.elementRef.nativeElement.classList.add('bg-base-200', 'text-success');
      } else {
        this.elementRef.nativeElement.classList.remove('bg-base-200', 'text-success');
      }
    });
  }

  private getCurrentSortIcon() {
    let iconElement = this.elementRef.nativeElement.querySelector('i');

    if (!iconElement) {
      iconElement = document.createElement('i');
      this.elementRef.nativeElement.insertBefore(
        iconElement,
        this.elementRef.nativeElement.firstChild,
      );
    }

    return iconElement;
  }

  private updateSortIcon(orderBy: OrderBy | null) {
    const defaultSortIcon = 'fa-solid fa-sort mr-2';
    const sortAscIcon = 'fa-solid fa-arrow-down-short-wide mr-2';
    const sortDescIcon = 'fa-solid fa-arrow-down-wide-short mr-2';
    let sortIcon: string;

    if (orderBy?.field !== this.appTableOrderedHeaderCol()) {
      sortIcon = defaultSortIcon;
    } else {
      switch (orderBy?.direction) {
        case 'asc':
          sortIcon = sortAscIcon;
          break;
        case 'desc':
          sortIcon = sortDescIcon;
          break;
        default:
          sortIcon = defaultSortIcon;
      }
    }

    this.getCurrentSortIcon().className = sortIcon;
  }
}
