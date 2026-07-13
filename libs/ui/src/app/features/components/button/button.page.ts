import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';

@Component({
  selector: 'app-button-page',
  templateUrl: './button.page.html',
  imports: [Section, Button, Tabs],
})
export class ButtonPage {
  private readonly docs = useDocsCopy('button');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
