```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { ModalContainer, ModalRef } from '@/shared/components/modal';

@Component({
  selector: 'app-modal-dialog-sample',
  templateUrl: './modal-dialog-sample.html',
  imports: [ModalContainer, Button],
})
export class ModalDialogSample {
  readonly modalRef = inject(ModalRef);
}
```
