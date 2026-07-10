# Alert

## Installation

```bash
kl install alert
```

### HTML

```html
<button appButton btnVariant="info" (click)="showAlert('info')">Info</button>
<button appButton btnVariant="warning" (click)="showAlert('warning')">Warning</button>
<button appButton btnVariant="error" (click)="showAlert('error')">Error</button>
<button appButton btnVariant="success" (click)="showAlert('success')">Success</button>
```

```typescript
import { Alert, AlertType } from '@/shared/components/alert';
import { Button } from '@/shared/components/button';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-alert-sample',
  templateUrl: './alert-sample.html',
  imports: [Button],
})
export class AlertSample {
  private readonly alert = inject(Alert);

  showAlert(type: AlertType) {
    switch (type) {
      case 'success':
        this.alert.success('This is a success message');
        break;
      case 'error':
        this.alert.error('This is an error message');
        break;
      case 'warning':
        this.alert.warning('This is a warning message');
        break;
      case 'info':
        this.alert.info('This is an info message');
        break;
    }
  }
}
```
