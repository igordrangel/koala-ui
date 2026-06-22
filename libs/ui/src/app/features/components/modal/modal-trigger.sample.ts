import { Button } from '@/shared/components/button';
import { Modal, ModalConfig } from '@/shared/components/modal';
import { Component, inject } from '@angular/core';
import { ModalSample } from './modal-sample';

@Component({
  selector: 'app-modal-trigger-sample',
  template: `
    <div class="flex items-center justify-center">
      <button appButton (click)="openModal({ pressEscape: true, clickOutside: false })">
        open modal
      </button>
    </div>
  `,
  imports: [Button],
})
export class ModalTriggerSample {
  private readonly modal = inject(Modal);

  openModal(
    closeOptions: ModalConfig['closeOptions'],
    closeButtonCorner = false,
    customWidth?: string,
  ) {
    this.modal.open(ModalSample, { closeOptions, data: { closeButtonCorner, customWidth } });
  }
}
