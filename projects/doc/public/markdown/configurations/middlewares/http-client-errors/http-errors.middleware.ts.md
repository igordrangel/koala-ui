```typescript
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientErrorsMiddleware } from '@koalarx/ui/core/middlewares';

export class HttpErrorMiddleware implements HttpClientErrorsMiddleware {
  handleError(response: HttpErrorResponse): string {
    if (response.status === 404) {
      return 'Resource not found';
    }

    return 'An unexpected error occurred';
  }
}
```
