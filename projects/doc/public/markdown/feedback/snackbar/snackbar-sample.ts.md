```typescript
import { Component, inject } from "@angular/core";
import { Snackbar } from "@koalarx/ui/shared/components/snackbar";
import { Button } from "@koalarx/ui/shared/directives";

@Component({
  selector: "app-snackbar-sample",
  templateUrl: "./snackbar-sample.html",
  imports: [Button],
})
export class SnackbarSample {
  private readonly snackbar = inject(Snackbar);

  success() {
    this.snackbar.success("This is a success snackbar message.");
  }

  error() {
    this.snackbar.error("This is an error snackbar message.");
  }

  info() {
    this.snackbar.info("This is an info snackbar message.");
  }

  warning() {
    this.snackbar.warning("This is a warning snackbar message.");
  }
}
```
