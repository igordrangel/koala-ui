import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  InjectionToken,
  OnDestroy,
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
export class SideWindowRef implements OnDestroy {
  private readonly appRef = inject<ApplicationRef>(SIDE_WINDOW_APP_REF);
  private readonly componentRef = inject<() => ComponentRef<Type<any>>>(
    SIDE_WINDOW_REF_TOKEN,
  );
  private readonly afterCloseTrigger = inject<SideWindowAfterCloseTriggerFn>(
    SIDE_WINDOW_AFTER_CLOSE_TRIGGER,
  );
  private readonly onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.dismiss();
    }
  };
  private readonly onClick = (event: MouseEvent) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.classList.contains('backdrop')
    ) {
      this.dismiss();
    }
  };

  constructor() {
    setTimeout(() => {
      document.addEventListener('keyup', this.onKeyUp);
      document.addEventListener('click', this.onClick);
    }, 150);
  }

  ngOnDestroy() {
    document.removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('click', this.onClick);
  }

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
    }, 50);
  }
}
