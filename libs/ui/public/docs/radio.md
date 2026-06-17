# Radio

## Installation

```bash
kl install radio
```

### Disabled

```html
<input type="radio" appRadio disabled />
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Radio } from '@/shared/components/radio';

@Component({
  selector: 'app-radio-sample',
  templateUrl: './radio-sample.html',
  imports: [ReactiveFormsModule, Radio],
})
export class RadioSample {
  radioControl = new FormControl<string>('');
}
```

### Sizes

```html
<input type="radio" appRadio="sample" size="xs" value="xs" [formControl]="radioControl" />
<input type="radio" appRadio="sample" size="sm" value="sm" [formControl]="radioControl" />
<input type="radio" appRadio="sample" size="md" value="md" [formControl]="radioControl" />
<input type="radio" appRadio="sample" size="lg" value="lg" [formControl]="radioControl" />
<input type="radio" appRadio="sample" size="xl" value="xl" [formControl]="radioControl" />
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Radio } from '@/shared/components/radio';

@Component({
  selector: 'app-radio-sample',
  templateUrl: './radio-sample.html',
  imports: [ReactiveFormsModule, Radio],
})
export class RadioSample {
  radioControl = new FormControl<string>('');
}
```

### Variants

```html
<input
  type="radio"
  appRadio="sample"
  variant="neutral"
  value="neutral"
  [formControl]="radioControl"
/>
<input
  type="radio"
  appRadio="sample"
  variant="primary"
  value="primary"
  [formControl]="radioControl"
/>
<input
  type="radio"
  appRadio="sample"
  variant="secondary"
  value="secondary"
  [formControl]="radioControl"
/>
<input
  type="radio"
  appRadio="sample"
  variant="accent"
  value="accent"
  [formControl]="radioControl"
/>
<input type="radio" appRadio="sample" variant="info" value="info" [formControl]="radioControl" />
<input
  type="radio"
  appRadio="sample"
  variant="success"
  value="success"
  [formControl]="radioControl"
/>
<input
  type="radio"
  appRadio="sample"
  variant="warning"
  value="warning"
  [formControl]="radioControl"
/>
<input type="radio" appRadio="sample" variant="error" value="error" [formControl]="radioControl" />
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Radio } from '@/shared/components/radio';

@Component({
  selector: 'app-radio-sample',
  templateUrl: './radio-sample.html',
  imports: [ReactiveFormsModule, Radio],
})
export class RadioSample {
  radioControl = new FormControl<string>('');
}
```

### TypeScript

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Radio } from '@/shared/components/radio';

@Component({
  selector: 'app-radio-sample',
  templateUrl: './radio-sample.html',
  imports: [ReactiveFormsModule, Radio],
})
export class RadioSample {
  radioControl = new FormControl<string>('');
}
```
