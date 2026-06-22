```typescript
import { ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FeedbackRequestInterceptor } from './core/interceptors/feedback-request-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: FeedbackRequestInterceptor, multi: true },
  ],
};
```

After install, customize `ignoreError` in `http-errors.midleware.ts` to skip URLs or status codes your app handles locally.
