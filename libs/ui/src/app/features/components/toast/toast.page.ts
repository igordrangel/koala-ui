import { Section } from '@/core/components/section';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { ToastTriggerSample } from './toast-trigger.sample';

@Component({
  selector: 'app-toast-page',
  templateUrl: './toast.page.html',
  imports: [Section, Tabs, ToastTriggerSample],
})
export class ToastPage {}
