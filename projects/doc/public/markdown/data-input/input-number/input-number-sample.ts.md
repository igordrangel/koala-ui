```typescript
import { Component, inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { InputNumber } from "@koalarx/ui/shared/components/input-field/input-number";

@Component({
  selector: "app-input-number-sample",
  templateUrl: "./input-number-sample.html",
  imports: [InputNumber],
})
export class InputNumberSample {
  form = inject(FormBuilder).group({
    number: [""],
  });
}
```
