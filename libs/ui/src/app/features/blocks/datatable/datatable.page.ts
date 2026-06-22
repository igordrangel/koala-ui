import { Section } from '@/core/components/section';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { DatatableSample } from './datatable.sample';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.page.html',
  imports: [Section, Tabs, DatatableSample],
})
export class DatatablePage {}
