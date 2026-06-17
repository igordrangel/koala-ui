import { HttpErrorResponse } from '@angular/common/http';
import { sanitizeErrorMessage } from '../utils/sanitize-error-message';

export class HttpErrorMiddleware {
  handleError(response: HttpErrorResponse): string {
    return sanitizeErrorMessage(response);
  }

  ignoreError(response: HttpErrorResponse): boolean {
    if (response.status === 401) {
      return true;
    }

    if (response.url?.includes('/person/')) {
      return true;
    }

    return false;
  }
}
