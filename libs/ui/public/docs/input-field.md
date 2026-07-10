# Input Field

## Installation

```bash
kl install input-field
```

### Sizes

```html
<input appInput size="xs" type="text" placeholder="Type here" />
<input appInput size="sm" type="text" placeholder="Type here" />
<input appInput size="md" type="text" placeholder="Type here" />
<input appInput size="lg" type="text" placeholder="Type here" />
<input appInput size="xl" type="text" placeholder="Type here" />
```

```typescript
import { Component } from '@angular/core';
import { Input } from '@/shared/components/input-field';

@Component({
  selector: 'app-input-field-sample',
  templateUrl: './input-field.sample.html',
  imports: [Input],
})
export class InputFieldSample {}
```
