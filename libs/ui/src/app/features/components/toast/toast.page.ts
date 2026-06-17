import { Section } from '@/core/components/section';
import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Toast, ToastType } from '@/shared/components/toast';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-toast-page',
  templateUrl: './toast.page.html',
  imports: [Section, Tabs, Button],
})
export class ToastPage {
  private readonly toast = inject(Toast);

  showToast(type: ToastType) {
    switch (type) {
      case 'success':
        this.toast.success('This is a success message', { title: 'Success' });
        break;
      case 'error':
        this.toast.error('This is an error message', { title: 'Error' });
        break;
      case 'warning':
        this.toast.warning('This is a warning message', { title: 'Warning' });
        break;
      case 'info':
        this.toast.info('This is an info message', { title: 'Info' });
        break;
    }
  }
}
