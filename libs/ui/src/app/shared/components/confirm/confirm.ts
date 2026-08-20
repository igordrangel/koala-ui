import { inject, Service } from '@angular/core';
import { Modal } from '../modal';
import { ConfirmModal } from './confirm.modal';

export interface ConfirmData {
  text: string;
}

export interface ConfirmConfig {
  yesCb?: () => void;
  noCb?: () => void;
}

export interface ConfirmResult {
  answer: boolean;
}

@Service()
export class Confirm {
  private readonly modal = inject(Modal);

  ask(text: string, config?: ConfirmConfig) {
    this.modal.open(ConfirmModal, {
      data: { text },
      closeOptions: {
        trigger: {},
      },
      afterClosed: (result: ConfirmResult) => {
        if (result?.answer) {
          config?.yesCb?.();
        } else {
          config?.noCb?.();
        }
      },
    });
  }
}
