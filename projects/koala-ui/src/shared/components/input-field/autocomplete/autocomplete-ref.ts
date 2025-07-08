import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  InjectionToken,
  Type,
} from '@angular/core';
import { AUTOCOMPLETE_APP_REF } from './autocomplete';

export const AUTOCOMPLETE_REF_TOKEN = new InjectionToken(
  'AutocompleteRefToken'
);

@Injectable()
export class AutocompleteRef {
  private readonly appRef = inject<ApplicationRef>(AUTOCOMPLETE_APP_REF);
  private readonly componentRef = inject<() => ComponentRef<Type<any>>>(
    AUTOCOMPLETE_REF_TOKEN
  );

  close() {
    this.componentRef().destroy();
    this.appRef.detachView(this.componentRef().hostView);
  }
}
