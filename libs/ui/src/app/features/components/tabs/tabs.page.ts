import { Section } from '@/core/components/section';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs.page.html',
  imports: [Section, Tabs],
})
export class TabsPage {}
