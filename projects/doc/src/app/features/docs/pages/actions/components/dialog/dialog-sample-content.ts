import { Component, inject } from '@angular/core';
import {
  DIALOG_DATA,
  DialogContent,
  DialogRef,
} from '@koalarx/ui/shared/components/dialog';
import { Button } from '@koalarx/ui/shared/directives';

@Component({
  selector: 'app-dialog-sample-content',
  templateUrl: './dialog-sample-content.html',
  imports: [DialogContent, Button],
})
export class DialogSampleContent {
  private readonly dialogRef = inject(DialogRef);
  readonly dialogMessage = inject(DIALOG_DATA);

  close(reload = false) {
    this.dialogRef.dismiss(reload ? 'reload' : undefined);
  }
}
