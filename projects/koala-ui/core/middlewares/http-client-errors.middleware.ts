import { HttpErrorResponse } from '@angular/common/http';

export abstract class HttpClientErrorsMiddleware {
  abstract handleError(response: HttpErrorResponse): string;
}
