```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { ModalContainer, ModalRef } from '@/shared/components/modal';

@Component({
  selector: 'app-modal-dialog-close-corner-sample',
  templateUrl: './modal-dialog-close-corner-sample.html',
  imports: [ModalContainer, Button],
})
export class ModalDialogCloseCornerSample {
  readonly modalRef = inject(ModalRef);
}
```
