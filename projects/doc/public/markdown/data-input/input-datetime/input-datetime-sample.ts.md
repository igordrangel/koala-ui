```typescript
import { Component, inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { InputDatetime } from "@koalarx/ui/shared/components/input-field/input-datetime";
import { KlDate } from "@koalarx/utils/light/KlDate";

@Component({
  selector: "app-input-datetime-sample",
  templateUrl: "./input-datetime-sample.html",
  imports: [InputDatetime],
})
export class InputDatetimeSample {
  min = new KlDate().format("yyyy-MM-dd HH:mm");
  max = new KlDate().add(1, "years").format("yyyy-MM-dd HH:mm");

  form = inject(FormBuilder).group({
    datetime: [""],
  });
}
```
