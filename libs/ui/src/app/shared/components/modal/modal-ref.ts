import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  InjectionToken,
  Type,
} from '@angular/core';
import {
  MODAL_AFTER_CLOSE_TRIGGER,
  MODAL_APP_REF,
  ModalAfterCloseTrigger,
  ModalAfterCloseTriggerFn,
} from '.';

export const MODAL_REF_TOKEN = new InjectionToken('ModalRefToken');

@Injectable()
export class ModalRef {
  private readonly appRef = inject<ApplicationRef>(MODAL_APP_REF);
  private readonly componentRef = inject<() => ComponentRef<Type<any>>>(MODAL_REF_TOKEN);
  private readonly afterCloseTrigger = inject<ModalAfterCloseTriggerFn>(MODAL_AFTER_CLOSE_TRIGGER);

  dismiss(afterCloseTrigger?: ModalAfterCloseTrigger) {
    this.componentRef()
      .location.nativeElement.querySelector('.modal')
      .classList.add('animate-fade-out');
    this.componentRef()
      .location.nativeElement.querySelector('.modal-box')
      .classList.add('animate-zoom-out');

    setTimeout(() => {
      this.componentRef().destroy();
      this.appRef.detachView(this.componentRef().hostView);

      if (afterCloseTrigger) {
        this.afterCloseTrigger(afterCloseTrigger);
      }
    }, 190);
  }
}
