```typescript
import { Component, signal } from "@angular/core";
import { Button } from "@koalarx/ui/shared/directives";

@Component({
  selector: "app-button-loader-sample",
  templateUrl: "./button-loader-sample.html",
  imports: [Button],
})
export class ButtonLoaderSample {
  showLoader = signal(false);

  toggleLoader() {
    this.showLoader.set(true);
    setTimeout(() => {
      this.showLoader.set(false);
    }, 2000);
  }
}
```
