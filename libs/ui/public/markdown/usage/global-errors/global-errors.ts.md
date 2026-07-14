```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { feedbackRequestInterceptor } from './core/interceptors/feedback-request-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([feedbackRequestInterceptor])),
  ],
};
```

After install, customize `ignoreError` in `http-errors.midleware.ts` to skip URLs or status codes your app handles locally.
