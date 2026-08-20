import { inject, Service } from '@angular/core';
import { AlertModal } from '.';
import { Modal } from '../modal';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertData {
  text: string;
  type: AlertType;
}

@Service()
export class Alert {
  private readonly modal = inject(Modal);

  private alert(text: string, type: AlertType = 'success') {
    this.modal.open(AlertModal, {
      data: { text, type },
      closeOptions: {
        clickOutside: true,
        pressEscape: true,
      },
    });
  }

  success(message: string) {
    this.alert(message, 'success');
  }

  error(message: string) {
    this.alert(message, 'error');
  }

  warning(message: string) {
    this.alert(message, 'warning');
  }

  info(message: string) {
    this.alert(message, 'info');
  }
}
