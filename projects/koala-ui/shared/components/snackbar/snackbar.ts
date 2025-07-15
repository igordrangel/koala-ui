import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  inputBinding,
} from '@angular/core';
import { randomString } from '@koalarx/utils/KlString';
import { SnackbarContent } from './snackbar-content';
import { SNACKBAR_REF_TOKEN, SnackbarRef } from './snackbar-ref';

export const SNACKBAR_CONFIG = new InjectionToken('SnackbarConfig');
export const SNACKBAR_APP_REF = new InjectionToken('SnackbarAppRef');

export type SnackbarType = 'info' | 'success' | 'warning' | 'error';

export interface SnackbarConfig {
  type: SnackbarType;
  message: string;
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class Snackbar {
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

  success(message: string, timeout = 5000) {
    this.open({
      type: 'success',
      message,
      timeout,
    });
  }

  warning(message: string, timeout = 5000) {
    this.open({
      type: 'warning',
      message,
      timeout,
    });
  }

  error(message: string, timeout = 5000) {
    this.open({
      type: 'error',
      message,
      timeout,
    });
  }

  info(message: string, timeout = 5000) {
    this.open({
      type: 'info',
      message,
      timeout,
    });
  }

  open(config: SnackbarConfig) {
    const main = document.querySelector<HTMLElement>(
      'kl-snackbar-container div'
    );

    if (main) {
      const elementId = this.generateElementId();
      const container = main.appendChild(document.createElement('div'));
      container.id = elementId;
      container.classList.add('flex', 'item-center', 'justify-end');

      const componentRef = createComponent(SnackbarContent, {
        environmentInjector: this.injector,
        hostElement: container,
        elementInjector: Injector.create({
          providers: [
            { provide: SNACKBAR_CONFIG, useValue: config },
            { provide: SNACKBAR_APP_REF, useValue: this.appRef },
            {
              provide: SNACKBAR_REF_TOKEN,
              useValue: () => componentRef,
            },
            {
              provide: SnackbarRef,
              deps: [SNACKBAR_CONFIG, SNACKBAR_APP_REF, SNACKBAR_REF_TOKEN],
            },
          ],
        }),
        bindings: [
          inputBinding('type', () => config.type),
          inputBinding('message', () => config.message),
          inputBinding('timeout', () => config.timeout ?? 0),
        ],
      });

      this.appRef.attachView(componentRef.hostView);

      componentRef.changeDetectorRef.detectChanges();
    }
  }
}
