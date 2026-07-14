# Global Errors

## Installation

```bash
kl install global-errors
```

### TypeScript

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

### Overview

Global Errors provides automatic HTTP error feedback via toast notifications. A global interceptor captures failed requests and displays user-friendly messages.

## Components

### FeedbackRequestInterceptor

Angular HTTP interceptor that delegates errors to `HttpErrorFeedbackAlert`.

### HttpErrorFeedbackAlert

Injectable service that shows toasts based on status code:

- **4xx**: warning toast
- **5xx**: error toast
- **other**: info toast

### HttpErrorMiddleware

- **handleError(response)**: Returns a sanitized message.
- **ignoreError(response)**: Skips feedback for specific errors (e.g. 401). Customize after install.

### sanitizeErrorMessage

Utility that extracts or maps error messages from `HttpErrorResponse`.

## Setup

Requires the [Toast](./toast.md) component and registration in `app.config.ts` (added automatically by `kl install global-errors`).
