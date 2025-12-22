import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  InjectionToken,
  Type,
} from '@angular/core';
import { SELECT_MULTIPLE_APP_REF } from './select-multiple-element-control';

export const SELECT_MULTIPLE_REF_TOKEN = new InjectionToken(
  'SelectMultipleRefToken'
);

@Injectable()
export class SelectMultipleRef {
  private readonly appRef = inject<ApplicationRef>(SELECT_MULTIPLE_APP_REF);
  private readonly componentRef = inject<() => ComponentRef<Type<any>>>(
    SELECT_MULTIPLE_REF_TOKEN
  );

  close() {
    setTimeout(() => {
      this.componentRef().destroy();
      this.appRef.detachView(this.componentRef().hostView);
    });
  }
}
