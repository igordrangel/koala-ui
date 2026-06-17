import { Component, inject, OnDestroy } from '@angular/core';
import { BOTTOM_SHEET_CONFIG, BottomSheetConfig, BottomSheetRef } from '.';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet-container.html',
})
export class BottomSheetContainer implements OnDestroy {
  private readonly bottomSheetRef = inject(BottomSheetRef);
  private readonly bottomSheetConfig = inject<BottomSheetConfig>(BOTTOM_SHEET_CONFIG);
  private readonly onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.bottomSheetRef.dismiss();
    }
  };
  private readonly onClick = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('modal')) {
      this.bottomSheetRef.dismiss();
    }
  };

  ngOnDestroy() {
    document.removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('click', this.onClick);
  }

  constructor() {
    setTimeout(() => {
      if (this.bottomSheetConfig.closeOptions?.pressEscape) {
        document.addEventListener('keyup', this.onKeyUp);
      }

      if (this.bottomSheetConfig.closeOptions?.clickOutside) {
        document.addEventListener('click', this.onClick);
      }
    }, 150);
  }
}
