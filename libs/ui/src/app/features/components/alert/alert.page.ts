import { Section } from '@/core/components/section';
import { Alert, AlertType } from '@/shared/components/alert';
import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert.page.html',
  imports: [Section, Tabs, Button],
})
export class AlertPage {
  private readonly alert = inject(Alert);

  showAlert(type: AlertType) {
    switch (type) {
      case 'success':
        this.alert.success('This is a success message');
        break;
      case 'error':
        this.alert.error('This is an error message');
        break;
      case 'warning':
        this.alert.warning('This is a warning message');
        break;
      case 'info':
        this.alert.info('This is an info message');
        break;
    }
  }
}
