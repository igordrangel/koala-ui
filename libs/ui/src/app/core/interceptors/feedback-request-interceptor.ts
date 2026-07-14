import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { HttpErrorFeedbackAlert } from '../utils/http-error-feedback-alert';

export const feedbackRequestInterceptor: HttpInterceptorFn = (request, next) => {
  const httpError = inject(HttpErrorFeedbackAlert);

  return next(request).pipe(
    tap({
      error: (error) => httpError.tapError(error),
    }),
  );
};
