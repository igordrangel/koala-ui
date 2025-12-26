import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kl-snackbar-container',
  templateUrl: './snackbar-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarContainer {}
