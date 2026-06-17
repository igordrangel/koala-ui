import { Button } from '@/shared/components/button';
import {
  SIDE_WINDOW_CONFIG,
  SIDE_WINDOW_DATA,
  SideWindowConfig,
  SideWindowContainer,
  SideWindowRef,
} from '@/shared/components/side-window';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-side-window-sample',
  templateUrl: './side-window-sample.html',
  imports: [SideWindowContainer, Button],
})
export class SideWindowSample {
  private readonly data = inject<any>(SIDE_WINDOW_DATA);

  readonly sideWindowRef = inject(SideWindowRef);
  readonly sideWindowOptions = inject<SideWindowConfig>(SIDE_WINDOW_CONFIG);
  readonly closeButtonCorner = this.data?.closeButtonCorner || false;
}
