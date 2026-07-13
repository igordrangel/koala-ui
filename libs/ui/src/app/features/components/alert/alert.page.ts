import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { AlertTriggerSample } from './alert-trigger.sample';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert.page.html',
  imports: [Section, Tabs, AlertTriggerSample],
})
export class AlertPage {
  private readonly docs = useDocsCopy('alert');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
