import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  InjectionToken,
} from '@angular/core';
import { SNACKBAR_APP_REF } from './snackbar';
import { SnackbarContent } from './snackbar-content';

export const SNACKBAR_REF_TOKEN = new InjectionToken('SnackbarRefToken');

@Injectable()
export class SnackbarRef {
  private readonly appRef = inject<ApplicationRef>(SNACKBAR_APP_REF);
  private readonly componentRef =
    inject<() => ComponentRef<SnackbarContent>>(SNACKBAR_REF_TOKEN);

  dismiss() {
    this.componentRef().destroy();
    this.appRef.detachView(this.componentRef().hostView);
  }
}
