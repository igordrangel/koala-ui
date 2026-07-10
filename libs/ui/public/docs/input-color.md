# Input Color

## Installation

```bash
kl install input-color
```

### HTML

```html
<app-input-color class="w-full max-w-sm" [formControl]="colorControl" />
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '@/shared/components/input-color';

@Component({
  selector: 'app-input-color-sample',
  templateUrl: './input-color-sample.html',
  imports: [ReactiveFormsModule, InputColor],
})
export class InputColorSample {
  colorControl = new FormControl<string | null>(null);
}
```

### Inline

```html
<app-input-color inline clearable [formControl]="colorControl" />
```
