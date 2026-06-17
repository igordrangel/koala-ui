# Modal

## Installation

```bash
kl install modal
```

### Dialog Alert

```html
<app-modal>
  <ng-container title>Hello!</ng-container>
  <ng-container content> Press ESC key or click outside to close </ng-container>
</app-modal>
```

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

### Dialog Close Corner

```html
<app-modal>
  <div class="flex justify-between items-center" title>
    <span>Hello!</span>
    <button appButton circle variant="ghost" size="sm" (click)="modalRef.dismiss()">X</button>
  </div>
  <ng-container content> Press ESC key or click the button below to close </ng-container>
</app-modal>
```

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

### Dialog Custom Width

```html
<app-modal>
  <ng-container title>Hello!</ng-container>
  <div class="w-200" content>Press ESC key or click the button below to close</div>
  <ng-container actions>
    <button appButton (click)="modalRef.dismiss()">Close</button>
  </ng-container>
</app-modal>
```

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

### Dialog

```html
<app-modal>
  <ng-container title>Hello!</ng-container>
  <ng-container content> Press ESC key or click the button below to close </ng-container>
  <ng-container actions>
    <button appButton (click)="modalRef.dismiss()">Close</button>
  </ng-container>
</app-modal>
```

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

### Trigger

```html
<button appButton (click)="openModal()">open modal</button>
```

### Trigger Custom Width

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

### Trigger Dialog Alert

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

### Trigger Dialog Close Corner

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

### Trigger Dialog

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
