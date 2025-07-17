import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfig } from '@koalarx/ui/core/config';
import { Snackbar } from '@koalarx/ui/shared/components/snackbar';

@Injectable({ providedIn: 'root' })
export class HttpErrorFeedbackAlert {
  private readonly snackbar = inject(Snackbar);
  private readonly httpClientErrorsMiddleware =
    AppConfig.httpClientErrorsMiddleware;
  private readonly translations =
    AppConfig.translation.feedbackRequestInterceptor;

  tapError(error: HttpErrorResponse) {
    const statusCode = error.status.toString();

    if (statusCode.charAt(0) === '4') {
      console.warn(error);

      this.snackbar.warning(
        this.httpClientErrorsMiddleware?.handleError(error) ??
          (this.translations as any)[statusCode]
      );
      return;
    } else if (statusCode.charAt(0) === '5') {
      console.error(error);

      this.snackbar.error(
        this.httpClientErrorsMiddleware?.handleError(error) ??
          (this.translations as any)[statusCode]
      );
      return;
    } else {
      console.info(error);

      this.snackbar.info(
        this.httpClientErrorsMiddleware?.handleError(error) ??
          this.translations.unknowError
      );
      return;
    }
  }
}
