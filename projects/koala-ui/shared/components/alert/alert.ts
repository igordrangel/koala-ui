import { inject, Injectable } from '@angular/core';
import { Dialog } from '../dialog';
import { AlertContent } from './alert-content';

export interface AlertData {
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  title?: string;
  okButtonText?: string;
}

export interface AlertConfig {
  data: AlertData;
  onClose?: () => void;
}

export interface AlertOptions extends Omit<AlertData, 'type'> {
  onClose?: () => void;
}

@Injectable({ providedIn: 'root' })
export class Alert {
  private readonly dialog = inject(Dialog);

  private open(config: AlertConfig) {
    this.dialog.open(AlertContent, {
      data: config.data,
      afterClosed: config.onClose
        ? {
            trigger: 'close',
            callback: config.onClose,
          }
        : undefined,
    });
  }

  success(options: AlertOptions) {
    this.open({
      data: {
        type: 'success',
        message: options.message,
        title: options.title,
        okButtonText: options.okButtonText,
      },
      onClose: options.onClose,
    });
  }

  error(options: AlertOptions) {
    this.open({
      data: {
        type: 'error',
        message: options.message,
        title: options.title,
        okButtonText: options.okButtonText,
      },
      onClose: options.onClose,
    });
  }

  info(options: AlertOptions) {
    this.open({
      data: {
        type: 'info',
        message: options.message,
        title: options.title,
        okButtonText: options.okButtonText,
      },
      onClose: options.onClose,
    });
  }

  warning(options: AlertOptions) {
    this.open({
      data: {
        type: 'warning',
        message: options.message,
        title: options.title,
        okButtonText: options.okButtonText,
      },
      onClose: options.onClose,
    });
  }
}
