import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TOAST_CONFIG, ToastConfig, ToastRef } from '.';
import { Button } from '../button';

@Component({
  selector: 'app-toast-alert',
  templateUrl: './toast-alert.html',
  imports: [Button],
})
export class ToastAlert implements OnInit, OnDestroy {
  private readonly hovered = signal(false);

  readonly toastRef = inject(ToastRef);
  readonly config = inject<ToastConfig>(TOAST_CONFIG);
  readonly timeout = this.config.timeout || 5000;

  readonly currentTimeout = signal(0);

  private startTimeout() {
    this.currentTimeout.set(this.timeout);

    const interval = setInterval(() => {
      const current = this.currentTimeout();
      if (current > 0) {
        this.currentTimeout.set(this.hovered() ? current : current - 10);
      } else {
        clearInterval(interval);
        this.toastRef.dismiss();
      }
    }, 10);
  }

  ngOnDestroy() {
    const toastContainer = document.querySelector('.toast-container');

    toastContainer!.removeEventListener('mouseenter', () => this.hovered.set(true));
    toastContainer!.removeEventListener('mouseleave', () => this.hovered.set(false));
  }

  ngOnInit() {
    if (this.timeout > 0) {
      const toastContainer = document.querySelector('.toast-container');

      toastContainer!.addEventListener('mouseenter', () => this.hovered.set(true));
      toastContainer!.addEventListener('mouseleave', () => this.hovered.set(false));

      this.startTimeout();
    }
  }
}
