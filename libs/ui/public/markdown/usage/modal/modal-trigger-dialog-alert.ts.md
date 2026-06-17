```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { Modal, ModalConfig } from '@/shared/components/modal';
import { ModalDialogAlertSample } from './modal-dialog-alert-sample';

@Component({
  selector: 'app-modal-trigger-dialog-alert-sample',
  templateUrl: './modal-trigger-dialog-alert.sample.html',
  imports: [Button],
})
export class ModalTriggerDialogAlertSample {
  private readonly modal = inject(Modal);

  openModal() {
    this.modal.open(ModalDialogAlertSample, {
      closeOptions: {
        pressEscape: true,
        clickOutside: true,
      },
    });
  }
}
```
