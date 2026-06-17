import { Component, inject, OnDestroy } from '@angular/core';
import { SIDE_WINDOW_CONFIG, SideWindowConfig, SideWindowRef } from '.';

@Component({
  selector: 'app-side-window',
  templateUrl: './side-window-container.html',
})
export class SideWindowContainer implements OnDestroy {
  private readonly sideWindowRef = inject(SideWindowRef);
  private readonly sideWindowConfig = inject<SideWindowConfig>(SIDE_WINDOW_CONFIG);
  private readonly onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.sideWindowRef.dismiss();
    }
  };
  private readonly onClick = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('modal')) {
      this.sideWindowRef.dismiss();
    }
  };

  ngOnDestroy() {
    document.removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('click', this.onClick);
  }

  constructor() {
    setTimeout(() => {
      if (this.sideWindowConfig.closeOptions?.pressEscape) {
        document.addEventListener('keyup', this.onKeyUp);
      }

      if (this.sideWindowConfig.closeOptions?.clickOutside) {
        document.addEventListener('click', this.onClick);
      }
    }, 150);
  }
}
