```typescript
import { Component, inject } from "@angular/core";
import {
  SIDE_WINDOW_DATA,
  SideWindowContent,
  SideWindowRef,
} from "@koalarx/ui/shared/components/side-window";
import { Button } from "@koalarx/ui/shared/directives";

@Component({
  selector: "app-side-window-sample-content",
  templateUrl: "./side-window-sample-content.html",
  imports: [SideWindowContent, Button],
})
export class SideWindowSampleContent {
  private readonly sideWindowRef = inject(SideWindowRef);
  readonly sideWindowMessage = inject(SIDE_WINDOW_DATA);

  close(reload = false) {
    this.sideWindowRef.dismiss(reload ? "reload" : undefined);
  }
}
```
