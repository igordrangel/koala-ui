import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { Stepper } from '@/shared/components/stepper';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper.page.html',
  imports: [Section, Tabs, Button, Stepper],
})
export class StepperPage {}
