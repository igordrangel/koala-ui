import { inject, Injectable } from '@angular/core';
import { Dialog } from '@koalarx/ui/shared/components/dialog';
import { ConfirmContent } from './confirm-content';

export interface ConfirmConfig {
  message: string;
  yesCallback?: () => void;
  noCallback?: () => void;
}

@Injectable({ providedIn: 'root' })
export class Confirm {
  private readonly dialog = inject(Dialog);

  open(config: ConfirmConfig) {
    this.dialog.open(ConfirmContent, {
      data: config.message,
      afterClosed: {
        trigger: {},
        callback: (confirm: { type: 'yes' | 'no' }) => {
          if (confirm.type === 'yes' && config.yesCallback) {
            config.yesCallback();
          } else if (confirm.type === 'no' && config.noCallback) {
            config.noCallback();
          }
        },
      },
    });
  }
}
