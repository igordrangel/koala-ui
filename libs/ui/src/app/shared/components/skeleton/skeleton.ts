import { Component, computed, input } from '@angular/core';
import type { ClassValue } from 'clsx';

export type SkeletonVariant = 'rect' | 'circle' | 'text';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.html',
})
export class Skeleton {
  readonly variant = input<SkeletonVariant>('rect');
  readonly class = input<ClassValue>();

  readonly skeletonVariantClass = computed(() => {
    const classValue = this.class();

    switch (this.variant()) {
      case 'rect':
        return `skeleton ${classValue || 'w-full h-4'}`;
      case 'circle':
        return `skeleton shrink-0 rounded-full ${classValue || 'w-4 h-4'}`;
      case 'text':
        return `skeleton skeleton-text ${classValue}`;
    }
  });
}
