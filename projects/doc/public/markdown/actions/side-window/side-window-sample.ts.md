```typescript
import { Component, inject } from "@angular/core";
import { SideWindow } from "@koalarx/ui/shared/components/side-window";
import { Button } from "@koalarx/ui/shared/directives";
import { SideWindowSampleContent } from "./side-window-sample-content";

@Component({
  selector: "app-side-window-sample",
  templateUrl: "./side-window-sample.html",
  imports: [Button],
})
export class SideWindowSample {
  private readonly sideWindow = inject(SideWindow);

  openSideWindow() {
    this.sideWindow.open(SideWindowSampleContent, {
      data: "This is a sample side window message.",
      afterClosed: {
        trigger: "reload",
        callback: () => {
          alert("Side window closed with reload action");
          // Implement any additional logic needed after side window closure
        },
      },
    });
  }
}
```
