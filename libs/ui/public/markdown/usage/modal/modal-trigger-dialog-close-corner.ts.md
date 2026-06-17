```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { Modal, ModalConfig } from '@/shared/components/modal';
import { ModalDialogCloseCornerSample } from './modal-dialog-close-corner-sample';

@Component({
  selector: 'app-modal-trigger-dialog-close-corner-sample',
  templateUrl: './modal-trigger-dialog-close-corner.sample.html',
  imports: [Button],
})
export class ModalTriggerDialogCloseCornerSample {
  private readonly modal = inject(Modal);

  openModal() {
    this.modal.open(ModalDialogCloseCornerSample, {
      closeOptions: {
        pressEscape: true,
        clickOutside: false,
      },
    });
  }
}
```
