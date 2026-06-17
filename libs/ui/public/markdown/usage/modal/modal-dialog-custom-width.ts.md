```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { ModalContainer, ModalRef } from '@/shared/components/modal';

@Component({
  selector: 'app-modal-dialog-custom-width-sample',
  templateUrl: './modal-dialog-custom-width-sample.html',
  imports: [ModalContainer, Button],
})
export class ModalDialogCustomWidthSample {
  readonly modalRef = inject(ModalRef);
}
```
