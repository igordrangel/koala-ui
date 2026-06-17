import { Component, inject } from '@angular/core';
import { AlertData } from '.';
import { Button } from '../button';
import { MODAL_DATA, ModalContainer, ModalRef } from '../modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert.modal.html',
  imports: [ModalContainer, Button],
})
export class AlertModal {
  readonly modalRef = inject(ModalRef);
  readonly data = inject<AlertData>(MODAL_DATA);
}
