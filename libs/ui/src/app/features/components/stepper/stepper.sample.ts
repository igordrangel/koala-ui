import { Button } from '@/shared/components/button';
import { Step, StepperContainer } from '@/shared/components/stepper';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper-sample',
  templateUrl: './stepper.sample.html',
  imports: [StepperContainer, Step, Button],
})
export class StepperSample {}
