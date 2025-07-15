import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { Button } from '@koalarx/ui/shared/directives';

@Component({
  selector: 'app-button-format-sample',
  templateUrl: './button-format-sample.html',
  imports: [SampleContainer, Button],
})
export class ButtonFormatSample {}
