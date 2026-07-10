# Range

## Installation

```bash
kl install range
```

### Disabled

```html
<input type="range" appRange disabled />
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Range } from '@/shared/components/range';

@Component({
  selector: 'app-range-sample',
  templateUrl: './range-sample.html',
  imports: [ReactiveFormsModule, Range],
})
export class RangeSample {
  rangeControl = new FormControl<number>(50);
}
```

### Sizes

```html
<input type="range" appRange size="xs" [formControl]="rangeControl" />
<input type="range" appRange size="sm" [formControl]="rangeControl" />
<input type="range" appRange size="md" [formControl]="rangeControl" />
<input type="range" appRange size="lg" [formControl]="rangeControl" />
<input type="range" appRange size="xl" [formControl]="rangeControl" />
```

### Variants

```html
<input type="range" appRange variant="neutral" [formControl]="rangeControl" />
<input type="range" appRange variant="primary" [formControl]="rangeControl" />
<input type="range" appRange variant="secondary" [formControl]="rangeControl" />
<input type="range" appRange variant="accent" [formControl]="rangeControl" />
<input type="range" appRange variant="info" [formControl]="rangeControl" />
<input type="range" appRange variant="success" [formControl]="rangeControl" />
<input type="range" appRange variant="warning" [formControl]="rangeControl" />
<input type="range" appRange variant="error" [formControl]="rangeControl" />
```
