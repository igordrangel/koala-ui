import {
  HttpInterceptor as AngularHttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { AuthorizationService } from '../security/authorization.service';

@Injectable()
export class AuthorizationInterceptor implements AngularHttpInterceptor {
  private readonly authorization = inject(AuthorizationService);

  private setAuthorization(request: HttpRequest<any>) {
    if (this.authorization.hasToken()) {
      return request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${
            request.url.includes('/token/refresh')
              ? this.authorization.refreshToken
              : this.authorization.accessToken
          }`,
        ),
      });
    }

    return request.clone();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      this.authorization.hasToken() &&
      this.authorization.isExpired() &&
      !request.url.includes('/token/refresh')
    ) {
      return this.authorization
        .updateToken()
        .pipe(switchMap(() => next.handle(this.setAuthorization(request))));
    }

    return next.handle(this.setAuthorization(request));
  }
}
