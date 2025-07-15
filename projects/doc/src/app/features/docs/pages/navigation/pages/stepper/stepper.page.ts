import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { StepperSample } from '../../components/stepper-sample/stepper-sample';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper.page.html',
  imports: [CodeViewer, OnThisPage, StepperSample],
})
export class StepperPage {}
