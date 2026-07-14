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
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Radio } from '@/shared/components/radio';

@Component({
  selector: 'app-radio-sample',
  templateUrl: './radio-sample.html',
  imports: [FormField, Radio],
})
export class RadioSample {
  private readonly radioModel = signal({ value: '' });
  readonly radioForm = form(this.radioModel);
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.

### Sizes

```html
<input type="radio" appRadio="sample" size="xs" value="xs" [formField]="radioForm.value" />
<input type="radio" appRadio="sample" size="sm" value="sm" [formField]="radioForm.value" />
<input type="radio" appRadio="sample" size="md" value="md" [formField]="radioForm.value" />
<input type="radio" appRadio="sample" size="lg" value="lg" [formField]="radioForm.value" />
<input type="radio" appRadio="sample" size="xl" value="xl" [formField]="radioForm.value" />
```

### Variants

```html
<input
  type="radio"
  appRadio="sample"
  variant="neutral"
  value="neutral"
  [formField]="radioForm.value"
/>
<input
  type="radio"
  appRadio="sample"
  variant="primary"
  value="primary"
  [formField]="radioForm.value"
/>
<input
  type="radio"
  appRadio="sample"
  variant="secondary"
  value="secondary"
  [formField]="radioForm.value"
/>
<input
  type="radio"
  appRadio="sample"
  variant="accent"
  value="accent"
  [formField]="radioForm.value"
/>
<input type="radio" appRadio="sample" variant="info" value="info" [formField]="radioForm.value" />
<input
  type="radio"
  appRadio="sample"
  variant="success"
  value="success"
  [formField]="radioForm.value"
/>
<input
  type="radio"
  appRadio="sample"
  variant="warning"
  value="warning"
  [formField]="radioForm.value"
/>
<input type="radio" appRadio="sample" variant="error" value="error" [formField]="radioForm.value" />
```
