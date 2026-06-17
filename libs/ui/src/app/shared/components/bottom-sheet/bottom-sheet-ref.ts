import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  InjectionToken,
  Type,
} from '@angular/core';
import {
  BOTTOM_SHEET_AFTER_CLOSE_TRIGGER,
  BOTTOM_SHEET_APP_REF,
  BottomSheetAfterCloseTrigger,
  BottomSheetAfterCloseTriggerFn,
} from '.';

export const BOTTOM_SHEET_REF_TOKEN = new InjectionToken('BottomSheetRefToken');

@Injectable()
export class BottomSheetRef {
  private readonly appRef = inject<ApplicationRef>(BOTTOM_SHEET_APP_REF);
  private readonly componentRef = inject<() => ComponentRef<Type<any>>>(BOTTOM_SHEET_REF_TOKEN);
  private readonly afterCloseTrigger = inject<BottomSheetAfterCloseTriggerFn>(
    BOTTOM_SHEET_AFTER_CLOSE_TRIGGER,
  );

  dismiss(afterCloseTrigger?: BottomSheetAfterCloseTrigger) {
    this.componentRef().location.nativeElement.classList.add('animate-slide-out-down');

    setTimeout(() => {
      this.componentRef().destroy();
      this.appRef.detachView(this.componentRef().hostView);

      if (afterCloseTrigger) {
        this.afterCloseTrigger(afterCloseTrigger);
      }
    }, 190);
  }
}
