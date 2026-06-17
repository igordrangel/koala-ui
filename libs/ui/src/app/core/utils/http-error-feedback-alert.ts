import { Toast } from '@/shared/components/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpErrorMiddleware } from '../middlewares/http-errors.midleware';

@Injectable({ providedIn: 'root' })
export class HttpErrorFeedbackAlert {
  private readonly toast = inject(Toast);

  tapError(error: HttpErrorResponse) {
    const httpClientErrorsMiddleware = new HttpErrorMiddleware();

    if (httpClientErrorsMiddleware.ignoreError(error)) {
      return;
    }

    const statusCode = error.status.toString();
    const errorMessage = httpClientErrorsMiddleware.handleError(error);

    if (statusCode.charAt(0) === '4') {
      console.warn(error);
      this.toast.warning(errorMessage);
      return;
    } else if (statusCode.charAt(0) === '5') {
      console.error(error);
      this.toast.error(errorMessage);
      return;
    } else {
      console.info(error);
      this.toast.info(errorMessage);
      return;
    }
  }
}
