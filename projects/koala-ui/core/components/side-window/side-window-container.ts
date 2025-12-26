import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kl-side-window-container',
  templateUrl: './side-window-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideWindowContainer {}
