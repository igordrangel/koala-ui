# Confirm

## Installation

```bash
kl install confirm
```

### HTML

```html
<button appButton (click)="ask()">Confirm</button>
```

```typescript
import { Button } from '@/shared/components/button';
import { Component, inject } from '@angular/core';
import { Confirm } from '@/shared/components/confirm';

@Component({
  selector: 'app-confirm-sample',
  templateUrl: './confirm-sample.html',
  imports: [Button],
})
export class ConfirmSample {
  private readonly confirm = inject(Confirm);

  ask() {
    this.confirm.ask(
      `<p>This action is <strong>irreversible</strong>.<br/>Are you sure you want to continue?</p>`,
      {
        yesCb: () => {
          alert('User confirmed');
        },
        noCb: () => {
          alert('User rejected');
        },
      },
    );
  }
}
```
