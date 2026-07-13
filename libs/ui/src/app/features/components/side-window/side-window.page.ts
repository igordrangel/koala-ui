import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { SideWindow, SideWindowConfig } from '@/shared/components/side-window';
import { Tabs } from '@/shared/components/tabs';
import { Component, inject } from '@angular/core';
import { SideWindowSample } from './side-window-sample';
import { SideWindowTriggerSample } from './side-window-trigger.sample';

@Component({
  selector: 'app-side-window-page',
  templateUrl: './side-window.page.html',
  imports: [Section, Tabs, SideWindowTriggerSample],
})
export class SideWindowPage {
  private readonly docs = useDocsCopy('side-window');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly sideWindow = inject(SideWindow);

  open(closeOptions: SideWindowConfig['closeOptions'], closeButtonCorner = false) {
    this.sideWindow.open(SideWindowSample, { closeOptions, data: { closeButtonCorner } });
  }
}
