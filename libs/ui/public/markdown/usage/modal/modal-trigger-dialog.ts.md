```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { Modal, ModalConfig } from '@/shared/components/modal';
import { ModalDialogSample } from './modal-dialog-sample';

@Component({
  selector: 'app-modal-trigger-dialog-sample',
  templateUrl: './modal-trigger-dialog.sample.html',
  imports: [Button],
})
export class ModalTriggerDialogSample {
  private readonly modal = inject(Modal);

  openModal() {
    this.modal.open(ModalDialogSample, {
      closeOptions: {
        pressEscape: true,
        clickOutside: false,
      },
    });
  }
}
```
