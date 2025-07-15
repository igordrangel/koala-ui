import { Component, inject } from '@angular/core';
import { CurrentTranslation } from '@koalarx/ui/core/translations/current-language';
import {
  DIALOG_DATA,
  DialogContent,
  DialogRef,
} from '@koalarx/ui/shared/components/dialog';
import { Button } from '@koalarx/ui/shared/directives';

@Component({
  selector: 'kl-confirm-content',
  templateUrl: './confirm-content.html',
  imports: [DialogContent, Button],
})
export class ConfirmContent {
  readonly translations = CurrentTranslation.get().confirm;
  private readonly dialogRef = inject(DialogRef);

  message = inject<string>(DIALOG_DATA);

  close(type: 'yes' | 'no') {
    this.dialogRef.dismiss({ type });
  }
}
