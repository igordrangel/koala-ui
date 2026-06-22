import { Button } from '@/shared/components/button';
import { SideWindow, SideWindowConfig } from '@/shared/components/side-window';
import { Component, inject } from '@angular/core';
import { SideWindowSample } from './side-window-sample';

@Component({
  selector: 'app-side-window-trigger-sample',
  template: `
    <div class="flex items-center justify-center">
      <button appButton (click)="open({ pressEscape: true, clickOutside: false })">
        open side window
      </button>
    </div>
  `,
  imports: [Button],
})
export class SideWindowTriggerSample {
  private readonly sideWindow = inject(SideWindow);

  open(closeOptions: SideWindowConfig['closeOptions'], closeButtonCorner = false) {
    this.sideWindow.open(SideWindowSample, { closeOptions, data: { closeButtonCorner } });
  }
}
