```typescript
import { Component, inject } from "@angular/core";
import { Dialog } from "@koalarx/ui/shared/components/dialog";
import { Button } from "@koalarx/ui/shared/directives";
import { DialogSampleContent } from "./dialog-sample-content";

@Component({
  selector: "app-dialog-sample",
  templateUrl: "./dialog-sample.html",
  imports: [Button],
})
export class DialogSample {
  private readonly dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(DialogSampleContent, {
      data: "This is a sample dialog message.",
      afterClosed: {
        trigger: "reload",
        callback: () => {
          alert("Dialog closed with reload action");
          // Implement any additional logic needed after dialog closure
        },
      },
    });
  }
}
```
