import { Section } from '@/core/components/section';
import { Collapse } from '@/shared/components/collapse';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-collapse-page',
  templateUrl: './collapse.page.html',
  imports: [Section, Tabs, Collapse],
})
export class CollapsePage {}
