import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Stepper } from '@/shared/components/stepper';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper.page.html',
  imports: [Section, Tabs, Button, Stepper],
})
export class StepperPage {
  private readonly docs = useDocsCopy('stepper');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
