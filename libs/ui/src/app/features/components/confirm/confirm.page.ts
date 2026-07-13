import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Button } from '@/shared/components/button';
import { Confirm } from '@/shared/components/confirm';
import { Tabs } from '@/shared/components/tabs';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm.page.html',
  imports: [Section, Tabs, Button],
})
export class ConfirmPage {
  private readonly docs = useDocsCopy('confirm');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly confirm = inject(Confirm);

  ask() {
    this.confirm.ask(
      `<p>This action is <strong>irreversible</strong>.<br/>Are you sure you want to continue?</p>`,
      {
        yesCb: () => {
          alert('User confirmed');
        },
        noCb: () => {
          alert('User rejected');
        },
      },
    );
  }
}
