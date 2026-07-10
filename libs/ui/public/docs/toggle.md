# Toggle

## Installation

```bash
kl install toggle
```

### Disabled

```html
<input type="checkbox" appToggle disabled />
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Toggle } from '@/shared/components/toggle';

@Component({
  selector: 'app-toggle-sample',
  templateUrl: './toggle-sample.html',
  imports: [ReactiveFormsModule, Toggle],
})
export class ToggleSample {
  toggleControl = new FormControl<boolean>(true);
}
```

### Sizes

```html
<input type="checkbox" appToggle size="xs" />
<input type="checkbox" appToggle size="sm" />
<input type="checkbox" appToggle size="md" />
<input type="checkbox" appToggle size="lg" />
<input type="checkbox" appToggle size="xl" />
```

### Variants

```html
<input type="checkbox" appToggle variant="neutral" />
<input type="checkbox" appToggle variant="primary" />
<input type="checkbox" appToggle variant="secondary" />
<input type="checkbox" appToggle variant="accent" />
<input type="checkbox" appToggle variant="info" />
<input type="checkbox" appToggle variant="success" />
<input type="checkbox" appToggle variant="warning" />
<input type="checkbox" appToggle variant="error" />
```
