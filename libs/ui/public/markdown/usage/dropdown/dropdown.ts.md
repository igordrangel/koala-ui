```typescript
import { Component } from '@angular/core';
import { Button } from '@/shared/components/button';
import { Dropdown } from '@/shared/components/dropdown';

@Component({
  selector: 'app-dropdown-sample',
  templateUrl: './dropdown.sample.html',
  imports: [Button, Dropdown],
})
export class DropdownSample {}
```
