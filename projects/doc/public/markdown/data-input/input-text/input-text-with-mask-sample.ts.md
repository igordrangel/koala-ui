```typescript
import { Component, inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { InputText } from "@koalarx/ui/shared/components/input-field/input-text";

@Component({
  selector: "app-input-text-with-mask-sample",
  templateUrl: "./input-text-with-mask-sample.html",
  imports: [InputText],
})
export class InputTextWithMaskSample {
  form = inject(FormBuilder).group({
    phone: [""],
  });
}
```
