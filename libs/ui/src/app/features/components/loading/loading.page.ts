import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Loading } from '@/shared/components/loading';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading.page.html',
  imports: [Section, Tabs, Loading],
})
export class LoadingPage {
  private readonly docs = useDocsCopy('loading');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
