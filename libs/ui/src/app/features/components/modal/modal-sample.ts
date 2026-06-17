import { Button } from '@/shared/components/button';
import {
  MODAL_CONFIG,
  MODAL_DATA,
  ModalConfig,
  ModalContainer,
  ModalRef,
} from '@/shared/components/modal';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-modal-sample',
  templateUrl: './modal-sample.html',
  imports: [ModalContainer, Button],
})
export class ModalSample {
  private readonly data = inject<any>(MODAL_DATA);

  readonly modalRef = inject(ModalRef);
  readonly modalOptions = inject<ModalConfig>(MODAL_CONFIG);
  readonly closeButtonCorner = this.data?.closeButtonCorner || false;
  readonly customWidth = this.modalOptions?.data?.customWidth || 'w-100';
}
