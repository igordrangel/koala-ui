import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  InjectionToken,
  Type,
} from '@angular/core';
import { TOAST_APP_REF } from './toast';

export const TOAST_REF_TOKEN = new InjectionToken('ToastRefToken');

@Injectable()
export class ToastRef {
  private readonly appRef = inject<ApplicationRef>(TOAST_APP_REF);
  private readonly componentRef = inject<() => ComponentRef<Type<any>>>(TOAST_REF_TOKEN);

  dismiss() {
    const hasMultipleChildren =
      this.componentRef().location.nativeElement.parentElement.children.length > 1;
    const animationClass = hasMultipleChildren ? 'animate-fade-out' : 'animate-fade-up-out';

    this.componentRef().location.nativeElement.classList.add(animationClass);

    setTimeout(() => {
      this.componentRef().destroy();
      this.appRef.detachView(this.componentRef().hostView);
    }, 290);
  }
}
