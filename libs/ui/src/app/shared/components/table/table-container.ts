import { booleanAttribute, Component, computed, input } from '@angular/core';
import type { ClassValue } from 'clsx';

export type TableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-table',
  templateUrl: './table-container.html',
  host: {
    '[class]': 'class()',
  },
})
export class TableContainer {
  readonly class = input<ClassValue>();
  readonly zebra = input(false, { transform: booleanAttribute });
  readonly size = input<TableSize>('md');
  readonly pinnedHeader = input(false, { transform: booleanAttribute });

  readonly tableSizeClass = computed(() => {
    switch (this.size()) {
      case 'xs':
        return `table-xs`;
      case 'sm':
        return `table-sm`;
      case 'md':
        return `table-md`;
      case 'lg':
        return `table-lg`;
      case 'xl':
        return `table-xl`;
    }
  });
}
