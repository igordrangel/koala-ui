import { Skeleton } from '@/shared/components/skeleton';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-rect-sample',
  template: `<app-skeleton class="h-32 w-full" variant="rect" />`,
  imports: [Skeleton],
})
export class SkeletonRectSample {}
