import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { Button, Tooltip } from '@koalarx/ui/shared/directives';

@Component({
  selector: 'app-tooltip-sample',
  templateUrl: './tooltip-sample.html',
  imports: [SampleContainer, Button, Tooltip],
})
export class TooltipSample {}
