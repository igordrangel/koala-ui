import { Skeleton } from '@//shared/components/skeleton';
import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-page',
  templateUrl: './skeleton.page.html',
  imports: [Section, Tabs, Skeleton],
})
export class SkeletonPage {
  private readonly docs = useDocsCopy('skeleton');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
