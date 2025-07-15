```typescript
import { Component } from "@angular/core";
import { Dropdown } from "@koalarx/ui/shared/components/dropdown";
import { Button } from "@koalarx/ui/shared/directives";

@Component({
  selector: "app-dropdown-sample",
  templateUrl: "./dropdown-sample.html",
  imports: [Dropdown, Button],
})
export class DropdownSample {}
```
