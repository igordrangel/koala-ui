# Toast

## Installation

```bash
kl install toast
```

### HTML

```html
<button appButton btnVariant="info" (click)="showToast('info')">Info</button>
<button appButton btnVariant="warning" (click)="showToast('warning')">Warning</button>
<button appButton btnVariant="error" (click)="showToast('error')">Error</button>
<button appButton btnVariant="success" (click)="showToast('success')">Success</button>
```

```typescript
import { Button } from '@/shared/components/button';
import { Toast, ToastType } from '@/shared/components/toast';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-toast-sample',
  templateUrl: './toast-sample.html',
  imports: [Button],
})
export class ToastSample {
  private readonly toast = inject(Toast);

  showToast(type: ToastType) {
    switch (type) {
      case 'success':
        this.toast.success('This is a success message', { title: 'Success' });
        break;
      case 'error':
        this.toast.error('This is an error message', { title: 'Error' });
        break;
      case 'warning':
        this.toast.warning('This is a warning message', { title: 'Warning' });
        break;
      case 'info':
        this.toast.info('This is an info message', { title: 'Info' });
        break;
    }
  }
}
```
