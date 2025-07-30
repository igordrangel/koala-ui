import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync } from '@angular/router';
import { Authorization } from '@koalarx/ui/shared/services';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly authService = inject(Authorization);

  canActivate(): MaybeAsync<GuardResult> {
    return this.authService.isAuthenticated();
  }
}
