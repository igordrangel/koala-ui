```typescript
import { SampleContainer } from "@/app/shared/components/sample-container/sample-container";
import { Component, inject } from "@angular/core";
import { Confirm } from "@koalarx/ui/shared/components/confirm";
import { Button } from "@koalarx/ui/shared/directives";

@Component({
  selector: "app-confirm-sample",
  templateUrl: "./confirm-sample.html",
  imports: [SampleContainer, Button],
})
export class ConfirmSample {
  private readonly confirm = inject(Confirm);

  startQuestion() {
    this.confirm.open({
      message: "Are you sure you want to proceed?",
      yesCallback: () => alert("Confirmed!"),
      noCallback: () => alert("Cancelled!"),
    });
  }
}
```
