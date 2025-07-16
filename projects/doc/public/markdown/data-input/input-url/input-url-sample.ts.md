```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputUrl } from '@koalarx/ui/shared/components/input-field/input-url';

@Component({
  selector: 'app-input-url-sample',
  templateUrl: './input-url-sample.html',
  imports: [InputUrl],
})
export class InputUrlSample {
  urlControl = new FormControl('');
}
```
