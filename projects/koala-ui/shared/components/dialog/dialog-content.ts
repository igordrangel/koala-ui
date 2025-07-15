import { Component, effect, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'kl-dialog-content',
  templateUrl: './dialog-content.html',
})
export class DialogContent {
  dialogElement = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const dialog = this.dialogElement();

      if (dialog) {
        dialog.nativeElement.showModal();
      }
    });
  }
}
