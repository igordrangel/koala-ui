import {
  HttpInterceptor as AngularHttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpErrorFeedbackAlert } from '@koalarx/ui/shared/utils';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class FeedbackRequestInterceptor implements AngularHttpInterceptor {
  private readonly httpError = inject(HttpErrorFeedbackAlert);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request.clone()).pipe(
      tap({
        error: (error) => this.httpError.tapError(error),
      })
    );
  }
}
