import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputTimeSample } from '../../components/input-time-sample/input-time-sample';

@Component({
  selector: 'app-input-time-page',
  templateUrl: './input-time.page.html',
  imports: [CodeViewer, OnThisPage, InputTimeSample],
})
export class InputTimePage {}
