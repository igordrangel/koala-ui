import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfig } from '@koalarx/ui/core/config';
import { Snackbar } from '@koalarx/ui/shared/components/snackbar';

@Injectable({ providedIn: 'root' })
export class HttpErrorFeedbackAlert {
  private readonly snackbar = inject(Snackbar);
  private readonly appConfig = inject(AppConfig);

  tapError(error: HttpErrorResponse) {
    const httpClientErrorsMiddleware =
      this.appConfig.httpClientErrorsMiddleware;
    const translations = this.appConfig.translation.feedbackRequestInterceptor;
    const statusCode = error.status.toString();

    if (statusCode.charAt(0) === '4') {
      console.warn(error);

      this.snackbar.warning(
        httpClientErrorsMiddleware?.handleError(error) ??
          (translations as any)[statusCode]
      );
      return;
    } else if (statusCode.charAt(0) === '5') {
      console.error(error);

      this.snackbar.error(
        httpClientErrorsMiddleware?.handleError(error) ??
          (translations as any)[statusCode]
      );
      return;
    } else {
      console.info(error);

      this.snackbar.info(
        httpClientErrorsMiddleware?.handleError(error) ??
          translations.unknowError
      );
      return;
    }
  }
}
