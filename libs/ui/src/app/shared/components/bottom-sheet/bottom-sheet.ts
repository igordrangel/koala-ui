import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Service,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { randomString } from '@koalarx/utils/KlString';
import { BOTTOM_SHEET_REF_TOKEN, BottomSheetRef } from '.';

export type BottomSheetAfterCloseTrigger = string | Record<string, any>;
export type BottomSheetAfterCloseTriggerFn = (trigger: BottomSheetAfterCloseTrigger) => void;
export const BOTTOM_SHEET_CONFIG = new InjectionToken('BottomSheetConfig');
export const BOTTOM_SHEET_DATA = new InjectionToken('BottomSheetData');
export const BOTTOM_SHEET_APP_REF = new InjectionToken('BottomSheetAppRef');
export const BOTTOM_SHEET_AFTER_CLOSE_TRIGGER = new InjectionToken<BottomSheetAfterCloseTriggerFn>(
  'BottomSheetAfterCloseTrigger',
);

export interface BottomSheetConfig {
  data?: any;
  closeOptions?: {
    trigger?: BottomSheetAfterCloseTrigger;
    pressEscape?: boolean;
    clickOutside?: boolean;
  };
  afterClosed?: (trigger: any) => void;
}

@Service()
export class BottomSheet {
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

  open(component: Type<any>, config?: BottomSheetConfig) {
    const body = document.body;
    const elementId = this.generateElementId();
    const container = body.appendChild(document.createElement('div'));

    container.id = elementId;
    container.classList.add('fixed', 'bottom-0', 'w-screen', 'lg:w-full', 'h-auto', 'z-10000');

    const componentRef = createComponent(component, {
      environmentInjector: this.injector,
      hostElement: container,
      elementInjector: Injector.create({
        providers: [
          { provide: BOTTOM_SHEET_CONFIG, useValue: config },
          { provide: BOTTOM_SHEET_APP_REF, useValue: this.appRef },
          {
            provide: BOTTOM_SHEET_REF_TOKEN,
            useValue: () => componentRef,
          },
          { provide: BOTTOM_SHEET_DATA, useValue: config?.data },
          {
            provide: BOTTOM_SHEET_AFTER_CLOSE_TRIGGER,
            useValue: (trigger: BottomSheetAfterCloseTrigger) => {
              if (
                config?.closeOptions &&
                (config.closeOptions.trigger === trigger || typeof trigger === 'object')
              ) {
                config.afterClosed?.(trigger);
              }
            },
          },
          {
            provide: BottomSheetRef,
            deps: [
              BOTTOM_SHEET_CONFIG,
              BOTTOM_SHEET_APP_REF,
              BOTTOM_SHEET_REF_TOKEN,
              BOTTOM_SHEET_AFTER_CLOSE_TRIGGER,
              BOTTOM_SHEET_DATA,
            ],
          },
        ],
      }),
    });

    this.appRef.attachView(componentRef.hostView);

    componentRef.changeDetectorRef.detectChanges();
  }
}
