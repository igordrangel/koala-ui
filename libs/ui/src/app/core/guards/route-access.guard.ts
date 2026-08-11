import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { AuthorizationService } from '../security/authorization.service';
import { RouteData } from '../utils/routes-registre';

@Injectable()
export class RouteAccessGuard implements CanActivate {
  private readonly authorization = inject(AuthorizationService);
  private readonly loggedUser = toObservable(this.authorization.loggedUser);

  canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    if (!this.authorization.hasToken()) {
      this.authorization.redirectToLogin();
      return false;
    }

    const data = route.data as RouteData;

    return this.loggedUser.pipe(
      filter(() => this.authorization.isAuthenticated()),
      map((loggedUser) => loggedUser?.hasPermission(data.rule) ?? false),
    );
  }
}
