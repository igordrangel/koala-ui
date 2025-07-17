import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  InjectionToken,
  Type,
} from '@angular/core';
import {
  SIDE_WINDOW_AFTER_CLOSE_TRIGGER,
  SIDE_WINDOW_APP_REF,
  SideWindowAfterCloseTrigger,
  SideWindowAfterCloseTriggerFn,
} from './side-window';

export const SIDE_WINDOW_REF_TOKEN = new InjectionToken('SideWindowRefToken');

@Injectable()
export class SideWindowRef {
  private readonly appRef = inject<ApplicationRef>(SIDE_WINDOW_APP_REF);
  private readonly componentRef = inject<() => ComponentRef<Type<any>>>(
    SIDE_WINDOW_REF_TOKEN
  );
  private readonly afterCloseTrigger = inject<SideWindowAfterCloseTriggerFn>(
    SIDE_WINDOW_AFTER_CLOSE_TRIGGER
  );

  dismiss(afterCloseTrigger?: SideWindowAfterCloseTrigger) {
    const componentRef = this.componentRef();
    componentRef.location.nativeElement
      .querySelector('div div')
      .classList.add('animate-slide-out-right');

    document.body.style.overflowY = 'auto';

    setTimeout(() => {
      componentRef.destroy();
      this.appRef.detachView(componentRef.hostView);

      if (afterCloseTrigger) {
        this.afterCloseTrigger(afterCloseTrigger);
      }
    }, 100);
  }
}
