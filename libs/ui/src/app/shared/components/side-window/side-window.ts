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
import { SIDE_WINDOW_REF_TOKEN, SideWindowRef } from './side-window-ref';

export type SideWindowAfterCloseTrigger = string | Record<string, any>;
export type SideWindowAfterCloseTriggerFn = (trigger: SideWindowAfterCloseTrigger) => void;
export const SIDE_WINDOW_CONFIG = new InjectionToken('SideWindowConfig');
export const SIDE_WINDOW_DATA = new InjectionToken('SideWindowData');
export const SIDE_WINDOW_APP_REF = new InjectionToken('SideWindowAppRef');
export const SIDE_WINDOW_AFTER_CLOSE_TRIGGER = new InjectionToken<SideWindowAfterCloseTriggerFn>(
  'SideWindowAfterCloseTrigger',
);

export interface SideWindowConfig {
  data?: any;
  closeOptions?: {
    trigger?: SideWindowAfterCloseTrigger;
    pressEscape?: boolean;
    clickOutside?: boolean;
  };
  afterClosed?: (trigger: any) => void;
}

@Service()
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
    const body = document.body;
    const elementId = this.generateElementId();
    const container = body.appendChild(document.createElement('div'));

    container.id = elementId;
    container.classList.add(
      'fixed',
      'top-0',
      'right-0',
      'w-auto',
      'h-full',
      'py-2',
      'pr-2',
      'z-10000',
    );

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
                config?.closeOptions &&
                (config.closeOptions.trigger === trigger || typeof trigger === 'object')
              ) {
                config.afterClosed?.(trigger);
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
  }
}
