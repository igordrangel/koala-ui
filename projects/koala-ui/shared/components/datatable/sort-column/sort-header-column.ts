import {
  Component,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  QueryPaginationDirection,
  SortFilterType,
} from '@koalarx/ui/core/models/query-pagination';
import { OrderedColumnState } from './ordered-column.state';

@Component({
  selector: 'kl-sort-header-column',
  templateUrl: './sort-header-column.html',
})
export class SortHeaderColumn {
  orderBy = input.required<string>();
  style = input('');
  defaultDirection = input<QueryPaginationDirection>();
  sortable = output<SortFilterType>();
  elOrderedColumn =
    viewChild<ElementRef<HTMLTableCellElement>>('orderedColumn');
  direction = signal<QueryPaginationDirection | null>(null);

  constructor() {
    effect(() => {
      const defaultDirection = this.defaultDirection();

      if (defaultDirection) {
        this.direction.set(defaultDirection);
        OrderedColumnState.current = this;
        this.toogleColumnStateOrder('set');
      }
    });
  }

  sort() {
    this.direction.update((current) => {
      if (
        OrderedColumnState.current &&
        OrderedColumnState.current.orderBy !== this.orderBy
      ) {
        OrderedColumnState.current.direction.set(null);
        OrderedColumnState.current.toogleColumnStateOrder('unset');
      }

      OrderedColumnState.current = this;

      let direction: QueryPaginationDirection;

      switch (current) {
        case 'asc':
          direction = 'desc';
          break;
        case 'desc':
        default:
          direction = 'asc';
      }

      this.toogleColumnStateOrder('set');

      this.sortable.emit({
        orderBy: this.orderBy(),
        direction,
      });

      return direction;
    });
  }

  async toogleColumnStateOrder(state: 'set' | 'unset') {
    const columnElement = this.elOrderedColumn()?.nativeElement.parentElement;

    if (!columnElement) {
      return;
    }

    if (state === 'set') {
      columnElement.classList.add('ordered-column');
    } else {
      columnElement.classList.remove('ordered-column');
    }
  }
}
