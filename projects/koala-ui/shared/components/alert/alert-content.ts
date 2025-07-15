import { Component, inject } from '@angular/core';
import {
  DIALOG_DATA,
  DialogContent,
  DialogRef,
} from '@koalarx/ui/shared/components/dialog';
import { Button } from '@koalarx/ui/shared/directives';
import { AlertData } from './alert';

@Component({
  selector: 'kl-alert-content',
  templateUrl: './alert-content.html',
  imports: [DialogContent, Button],
})
export class AlertContent {
  private readonly dialogRef = inject(DialogRef);

  data = inject<AlertData>(DIALOG_DATA);

  close() {
    this.dialogRef.dismiss('close');
  }
}
