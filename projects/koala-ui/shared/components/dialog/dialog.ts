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
import { DIALOG_REF_TOKEN, DialogRef } from './dialog-ref';

export type DialogAfterCloseTrigger = string | Record<string, any>;
export type DialogAfterCloseTriggerFn = (
  trigger: DialogAfterCloseTrigger
) => void;
export const DIALOG_CONFIG = new InjectionToken('DialogConfig');
export const DIALOG_DATA = new InjectionToken('DialogData');
export const DIALOG_APP_REF = new InjectionToken('DialogAppRef');
export const DIALOG_AFTER_CLOSE_TRIGGER =
  new InjectionToken<DialogAfterCloseTriggerFn>('DialogAfterCloseTrigger');

export interface DialogConfig {
  data?: any;
  afterClosed?: {
    trigger: DialogAfterCloseTrigger;
    callback: (trigger: any) => void;
  };
}

@Injectable({ providedIn: 'root' })
export class Dialog {
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

  open(component: Type<any>, config?: DialogConfig) {
    const main = document.querySelector<HTMLElement>(
      'kl-dialog-container .dialog-container'
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
            { provide: DIALOG_CONFIG, useValue: config },
            { provide: DIALOG_APP_REF, useValue: this.appRef },
            {
              provide: DIALOG_REF_TOKEN,
              useValue: () => componentRef,
            },
            { provide: DIALOG_DATA, useValue: config?.data },
            {
              provide: DIALOG_AFTER_CLOSE_TRIGGER,
              useValue: (trigger: DialogAfterCloseTrigger) => {
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
              provide: DialogRef,
              deps: [
                DIALOG_CONFIG,
                DIALOG_APP_REF,
                DIALOG_REF_TOKEN,
                DIALOG_AFTER_CLOSE_TRIGGER,
                DIALOG_DATA,
              ],
            },
          ],
        }),
      });

      this.appRef.attachView(componentRef.hostView);

      componentRef.changeDetectorRef.detectChanges();
    }
  }
}
