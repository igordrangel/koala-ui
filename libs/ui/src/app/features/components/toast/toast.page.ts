import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { ToastTriggerSample } from './toast-trigger.sample';

@Component({
  selector: 'app-toast-page',
  templateUrl: './toast.page.html',
  imports: [Section, Tabs, ToastTriggerSample],
})
export class ToastPage {
  private readonly docs = useDocsCopy('toast');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
