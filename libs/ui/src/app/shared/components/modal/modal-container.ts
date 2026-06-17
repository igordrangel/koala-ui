import { Component, inject, OnDestroy } from '@angular/core';
import { MODAL_CONFIG, ModalConfig, ModalRef } from '.';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-container.html',
})
export class ModalContainer implements OnDestroy {
  private readonly modalRef = inject(ModalRef);
  private readonly modalConfig = inject<ModalConfig>(MODAL_CONFIG);
  private readonly onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.modalRef.dismiss();
    }
  };
  private readonly onClick = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('modal')) {
      this.modalRef.dismiss();
    }
  };

  ngOnDestroy() {
    document.removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('click', this.onClick);
  }

  constructor() {
    setTimeout(() => {
      if (this.modalConfig.closeOptions?.pressEscape) {
        document.addEventListener('keyup', this.onKeyUp);
      }

      if (this.modalConfig.closeOptions?.clickOutside) {
        document.addEventListener('click', this.onClick);
      }
    }, 150);
  }
}
