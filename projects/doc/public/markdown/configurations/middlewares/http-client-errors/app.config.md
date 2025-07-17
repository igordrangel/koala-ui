```typescript
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideKoala } from "@koalarx/ui";
import { routes } from "./app.routes";
import { HttpErrorMiddleware } from "./http-errors.middleware";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideKoala({ httpClientErrorsMiddleware: new HttpErrorMiddleware() }),
  ],
};
```
