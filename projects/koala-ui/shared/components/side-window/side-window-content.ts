import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kl-side-window-content',
  templateUrl: './side-window-content.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideWindowContent {}
