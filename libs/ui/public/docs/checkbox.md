# Checkbox

## Installation

```bash
kl install checkbox
```

### Disabled

```html
<input type="checkbox" appCheckbox disabled />
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from '@/shared/components/checkbox';

@Component({
  selector: 'app-checkbox-sample',
  templateUrl: './checkbox-sample.html',
  imports: [ReactiveFormsModule, Checkbox],
})
export class CheckboxSample {
  checkboxControl = new FormControl<boolean>(true);
}
```

### Sizes

```html
<input type="checkbox" appCheckbox size="xs" />
<input type="checkbox" appCheckbox size="sm" />
<input type="checkbox" appCheckbox size="md" />
<input type="checkbox" appCheckbox size="lg" />
<input type="checkbox" appCheckbox size="xl" />
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from '@/shared/components/checkbox';

@Component({
  selector: 'app-checkbox-sample',
  templateUrl: './checkbox-sample.html',
  imports: [ReactiveFormsModule, Checkbox],
})
export class CheckboxSample {
  checkboxControl = new FormControl<boolean>(true);
}
```

### Variants

```html
<input type="checkbox" appCheckbox variant="neutral" />
<input type="checkbox" appCheckbox variant="primary" />
<input type="checkbox" appCheckbox variant="secondary" />
<input type="checkbox" appCheckbox variant="accent" />
<input type="checkbox" appCheckbox variant="info" />
<input type="checkbox" appCheckbox variant="success" />
<input type="checkbox" appCheckbox variant="warning" />
<input type="checkbox" appCheckbox variant="error" />
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from '@/shared/components/checkbox';

@Component({
  selector: 'app-checkbox-sample',
  templateUrl: './checkbox-sample.html',
  imports: [ReactiveFormsModule, Checkbox],
})
export class CheckboxSample {
  checkboxControl = new FormControl<boolean>(true);
}
```

### TypeScript

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from '@/shared/components/checkbox';

@Component({
  selector: 'app-checkbox-sample',
  templateUrl: './checkbox-sample.html',
  imports: [ReactiveFormsModule, Checkbox],
})
export class CheckboxSample {
  checkboxControl = new FormControl<boolean>(true);
}
```
