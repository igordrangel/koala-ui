import { Component, inject } from '@angular/core';
import { Button } from '../button';
import { MODAL_DATA, ModalContainer, ModalRef } from '../modal';
import { ConfirmData } from './confirm';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm.modal.html',
  imports: [ModalContainer, Button],
})
export class ConfirmModal {
  readonly modalRef = inject(ModalRef);
  readonly data = inject<ConfirmData>(MODAL_DATA);
}
