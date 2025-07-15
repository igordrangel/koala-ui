```typescript
import { Component, inject } from "@angular/core";
import { Alert } from "@koalarx/ui/shared/components/alert";
import { Button } from "@koalarx/ui/shared/directives";

@Component({
  selector: "app-alert-sample",
  templateUrl: "./alert-sample.html",
  imports: [Button],
})
export class AlertSample {
  private readonly alert = inject(Alert);

  success() {
    this.alert.success({
      message: "This is a success alert message.",
      title: "Success",
      okButtonText: "OK",
      onClose: () => console.log("Success alert closed"),
    });
  }

  error() {
    this.alert.error({
      message: "This is an error alert message.",
      title: "Error",
      okButtonText: "OK",
      onClose: () => console.log("Error alert closed"),
    });
  }

  info() {
    this.alert.info({
      message: "This is an info alert message.",
      title: "Info",
      okButtonText: "OK",
      onClose: () => console.log("Info alert closed"),
    });
  }

  warning() {
    this.alert.warning({
      message: "This is a warning alert message.",
      title: "Warning",
      okButtonText: "OK",
      onClose: () => console.log("Warning alert closed"),
    });
  }
}
```
