import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { AuthorizationService } from '../security/authorization.service';

function setAuthorization(request: HttpRequest<unknown>, authorization: AuthorizationService) {
  if (authorization.hasToken()) {
    return request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${
          request.url.includes('/token/refresh')
            ? authorization.refreshToken
            : authorization.accessToken
        }`,
      ),
    });
  }

  return request.clone();
}

export const authorizationInterceptor: HttpInterceptorFn = (request, next) => {
  const authorization = inject(AuthorizationService);

  if (
    authorization.hasToken() &&
    authorization.isExpired() &&
    !request.url.includes('/token/refresh')
  ) {
    return authorization
      .updateToken()
      .pipe(switchMap(() => next(setAuthorization(request, authorization))));
  }

  return next(setAuthorization(request, authorization));
};
