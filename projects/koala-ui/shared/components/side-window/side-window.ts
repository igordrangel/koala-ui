import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { randomString } from '@koalarx/utils/KlString';
import { SIDE_WINDOW_REF_TOKEN, SideWindowRef } from './side-window-ref';

export type SideWindowAfterCloseTrigger = string | Record<string, any>;
export type SideWindowAfterCloseTriggerFn = (
  trigger: SideWindowAfterCloseTrigger
) => void;
export const SIDE_WINDOW_CONFIG = new InjectionToken('SideWindowConfig');
export const SIDE_WINDOW_DATA = new InjectionToken('SideWindowData');
export const SIDE_WINDOW_APP_REF = new InjectionToken('SideWindowAppRef');
export const SIDE_WINDOW_AFTER_CLOSE_TRIGGER =
  new InjectionToken<SideWindowAfterCloseTriggerFn>(
    'SideWindowAfterCloseTrigger'
  );

export interface SideWindowConfig {
  data?: any;
  afterClosed?: {
    trigger: SideWindowAfterCloseTrigger;
    callback: (trigger: any) => void;
  };
}

@Injectable({ providedIn: 'root' })
export class SideWindow {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);

  private generateElementId() {
    let elementId: string;

    do {
      elementId = randomString(50, {
        numbers: false,
        lowercase: true,
        uppercase: true,
        specialCharacters: false,
      });
    } while (document.getElementById(elementId));

    return elementId;
  }

  open(component: Type<any>, config?: SideWindowConfig) {
    const main = document.querySelector<HTMLElement>(
      'kl-side-window-container .side-window-container'
    );

    if (main) {
      const elementId = this.generateElementId();
      const container = main.appendChild(document.createElement('div'));

      container.id = elementId;

      const componentRef = createComponent(component, {
        environmentInjector: this.injector,
        hostElement: container,
        elementInjector: Injector.create({
          providers: [
            { provide: SIDE_WINDOW_CONFIG, useValue: config },
            { provide: SIDE_WINDOW_APP_REF, useValue: this.appRef },
            {
              provide: SIDE_WINDOW_REF_TOKEN,
              useValue: () => componentRef,
            },
            { provide: SIDE_WINDOW_DATA, useValue: config?.data },
            {
              provide: SIDE_WINDOW_AFTER_CLOSE_TRIGGER,
              useValue: (trigger: SideWindowAfterCloseTrigger) => {
                if (
                  config?.afterClosed &&
                  (config.afterClosed.trigger === trigger ||
                    typeof trigger === 'object')
                ) {
                  config.afterClosed.callback(trigger);
                }
              },
            },
            {
              provide: SideWindowRef,
              deps: [
                SIDE_WINDOW_CONFIG,
                SIDE_WINDOW_APP_REF,
                SIDE_WINDOW_REF_TOKEN,
                SIDE_WINDOW_AFTER_CLOSE_TRIGGER,
                SIDE_WINDOW_DATA,
              ],
            },
          ],
        }),
      });

      this.appRef.attachView(componentRef.hostView);

      componentRef.changeDetectorRef.detectChanges();

      document.body.style.overflowY = 'hidden';
    }
  }
}
