import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { DatatableSample } from './datatable.sample';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.page.html',
  imports: [Section, Tabs, DatatableSample],
})
export class DatatablePage {
  private readonly docs = useDocsCopy('datatable');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
