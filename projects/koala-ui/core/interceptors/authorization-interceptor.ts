import {
  HttpInterceptor as AngularHttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfig } from '@koalarx/ui/core/config';
import { Authorization } from '@koalarx/ui/shared/services';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Injectable()
export class AuthorizationInterceptor implements AngularHttpInterceptor {
  private readonly authorization = inject(Authorization);
  private readonly authConfig = inject(AppConfig).authConfig;

  private setAuthorization(request: HttpRequest<any>) {
    if (this.authorization.hasToken()) {
      return request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${
            request.url === this.authConfig?.refreshToken?.url
              ? this.authorization.refreshToken
              : this.authorization.accessToken
          }`
        ),
      });
    }

    return request.clone();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedReq = this.setAuthorization(request);

    if (
      this.authorization.hasToken() &&
      this.authorization.isExpired() &&
      !this.authConfig?.refreshToken?.url
    ) {
      return this.authorization
        .updateToken()
        .pipe(switchMap(() => next.handle(this.setAuthorization(request))));
    }

    return next.handle(clonedReq);
  }
}
