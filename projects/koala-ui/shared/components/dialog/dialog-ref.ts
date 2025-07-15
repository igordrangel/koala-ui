import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  InjectionToken,
  Type,
} from '@angular/core';
import {
  DIALOG_AFTER_CLOSE_TRIGGER,
  DIALOG_APP_REF,
  DialogAfterCloseTrigger,
  DialogAfterCloseTriggerFn,
} from './dialog';

export const DIALOG_REF_TOKEN = new InjectionToken('DialogRefToken');

@Injectable()
export class DialogRef {
  private readonly appRef = inject<ApplicationRef>(DIALOG_APP_REF);
  private readonly componentRef =
    inject<() => ComponentRef<Type<any>>>(DIALOG_REF_TOKEN);
  private readonly afterCloseTrigger = inject<DialogAfterCloseTriggerFn>(
    DIALOG_AFTER_CLOSE_TRIGGER
  );

  dismiss(afterCloseTrigger?: DialogAfterCloseTrigger) {
    this.componentRef().destroy();
    this.appRef.detachView(this.componentRef().hostView);

    if (afterCloseTrigger) {
      this.afterCloseTrigger(afterCloseTrigger);
    }
  }
}
