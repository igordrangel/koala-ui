import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kl-dialog-container',
  templateUrl: './dialog-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContainer {}
