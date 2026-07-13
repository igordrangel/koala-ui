import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs.page.html',
  imports: [Section, Tabs],
})
export class TabsPage {
  private readonly docs = useDocsCopy('tabs');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
