import { Section } from '@/core/components/section';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { AlertTriggerSample } from './alert-trigger.sample';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert.page.html',
  imports: [Section, Tabs, AlertTriggerSample],
})
export class AlertPage {}
