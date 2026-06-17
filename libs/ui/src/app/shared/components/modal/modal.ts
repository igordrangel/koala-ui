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
import { MODAL_REF_TOKEN, ModalRef } from '.';

export type ModalAfterCloseTrigger = string | Record<string, any>;
export type ModalAfterCloseTriggerFn = (trigger: ModalAfterCloseTrigger) => void;
export const MODAL_CONFIG = new InjectionToken('ModalConfig');
export const MODAL_DATA = new InjectionToken('ModalData');
export const MODAL_APP_REF = new InjectionToken('ModalAppRef');
export const MODAL_AFTER_CLOSE_TRIGGER = new InjectionToken<ModalAfterCloseTriggerFn>(
  'ModalAfterCloseTrigger',
);

export interface ModalConfig {
  data?: any;
  closeOptions?: {
    trigger?: ModalAfterCloseTrigger;
    pressEscape?: boolean;
    clickOutside?: boolean;
  };
  afterClosed?: (trigger: any) => void;
}

@Injectable({ providedIn: 'root' })
export class Modal {
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

  open(component: Type<any>, config?: ModalConfig) {
    const body = document.body;

    if (body) {
      const elementId = this.generateElementId();
      const container = body.appendChild(document.createElement('div'));

      container.id = elementId;

      const componentRef = createComponent(component, {
        environmentInjector: this.injector,
        hostElement: container,
        elementInjector: Injector.create({
          providers: [
            { provide: MODAL_CONFIG, useValue: config },
            { provide: MODAL_APP_REF, useValue: this.appRef },
            {
              provide: MODAL_REF_TOKEN,
              useValue: () => componentRef,
            },
            { provide: MODAL_DATA, useValue: config?.data },
            {
              provide: MODAL_AFTER_CLOSE_TRIGGER,
              useValue: (trigger: ModalAfterCloseTrigger) => {
                if (
                  config?.closeOptions &&
                  (config.closeOptions.trigger === trigger || typeof trigger === 'object')
                ) {
                  config.afterClosed?.(trigger);
                }
              },
            },
            {
              provide: ModalRef,
              deps: [
                MODAL_CONFIG,
                MODAL_APP_REF,
                MODAL_REF_TOKEN,
                MODAL_AFTER_CLOSE_TRIGGER,
                MODAL_DATA,
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
