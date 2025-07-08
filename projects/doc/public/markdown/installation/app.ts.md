```typescript
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { KlRoot } from "@koalarx/ui/core/components/kl-root";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  imports: [KlRoot, RouterOutlet],
})
export class App {}
```
