```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { Modal, ModalConfig } from '@/shared/components/modal';
import { ModalDialogCustomWidthSample } from './modal-dialog-custom-width-sample';

@Component({
  selector: 'app-modal-trigger-dialog-custom-width-sample',
  templateUrl: './modal-trigger-dialog-custom-width.sample.html',
  imports: [Button],
})
export class ModalTriggerDialogCustomWidthSample {
  private readonly modal = inject(Modal);

  openModal() {
    this.modal.open(ModalDialogCustomWidthSample, {
      closeOptions: {
        pressEscape: true,
        clickOutside: false,
      },
    });
  }
}
```
