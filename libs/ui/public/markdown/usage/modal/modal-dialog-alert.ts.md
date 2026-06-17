```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { ModalContainer, ModalRef } from '@/shared/components/modal';

@Component({
  selector: 'app-modal-dialog-alert-sample',
  templateUrl: './modal-dialog-alert-sample.html',
  imports: [ModalContainer, Button],
})
export class ModalDialogAlertSample {
  readonly modalRef = inject(ModalRef);
}
```
