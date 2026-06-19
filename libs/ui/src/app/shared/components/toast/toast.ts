import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
} from '@angular/core';
import { randomString } from '@koalarx/utils/KlString';
import { TOAST_REF_TOKEN, ToastAlert, ToastRef } from '.';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';
export const TOAST_CONFIG = new InjectionToken('ToastConfig');
export const TOAST_APP_REF = new InjectionToken('ToastAppRef');

export interface ToastConfig {
  type: ToastType;
  message: string;
  title?: string;
  timeout?: number;
}

export interface ToastOptions {
  title?: string;
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class Toast {
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

  private open(config?: ToastConfig) {
    const body = document.body;

    if (body) {
      let toastContainer = document.querySelector('.toast-container') as HTMLElement;

      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.classList.add(
          'toast-container',
          'toast',
          'toast-center',
          'toast-top',
          'z-[100000]',
          'group',
        );

        body.appendChild(toastContainer);
      }

      const elementId = this.generateElementId();
      const container = document.createElement('div');

      container.id = elementId;

      toastContainer.insertBefore(container, toastContainer.firstChild);

      const componentRef = createComponent(ToastAlert, {
        environmentInjector: this.injector,
        hostElement: container,
        elementInjector: Injector.create({
          providers: [
            { provide: TOAST_CONFIG, useValue: config },
            { provide: TOAST_APP_REF, useValue: this.appRef },
            {
              provide: TOAST_REF_TOKEN,
              useValue: () => componentRef,
            },
            {
              provide: ToastRef,
              deps: [TOAST_CONFIG, TOAST_APP_REF, TOAST_REF_TOKEN],
            },
          ],
        }),
      });

      this.appRef.attachView(componentRef.hostView);
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  success(message: string, options?: ToastOptions) {
    this.open({
      type: 'success',
      title: options?.title,
      message,
      timeout: options?.timeout,
    });
  }

  error(message: string, options?: ToastOptions) {
    this.open({
      type: 'error',
      title: options?.title,
      message,
      timeout: options?.timeout,
    });
  }

  info(message: string, options?: ToastOptions) {
    this.open({
      type: 'info',
      title: options?.title,
      message,
      timeout: options?.timeout,
    });
  }

  warning(message: string, options?: ToastOptions) {
    this.open({
      type: 'warning',
      title: options?.title,
      message,
      timeout: options?.timeout,
    });
  }

  default(message: string, options?: ToastOptions) {
    this.open({
      type: 'default',
      title: options?.title,
      message,
      timeout: options?.timeout,
    });
  }
}
