import { Section } from '@/core/components/section';
import { Modal, ModalConfig } from '@/shared/components/modal';
import { Tabs } from '@/shared/components/tabs';
import { Component, inject } from '@angular/core';
import { ModalSample } from './modal-sample';
import { ModalTriggerSample } from './modal-trigger.sample';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal.page.html',
  imports: [Section, Tabs, ModalTriggerSample],
})
export class ModalPage {
  private readonly modal = inject(Modal);

  openModal(
    closeOptions: ModalConfig['closeOptions'],
    closeButtonCorner = false,
    customWidth?: string,
  ) {
    this.modal.open(ModalSample, { closeOptions, data: { closeButtonCorner, customWidth } });
  }
}
