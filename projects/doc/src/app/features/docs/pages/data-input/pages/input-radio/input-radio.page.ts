import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputRadioSample } from '../../components/input-radio-sample/input-radio-sample';

@Component({
  selector: 'app-input-radio-page',
  templateUrl: './input-radio.page.html',
  imports: [CodeViewer, OnThisPage, InputRadioSample],
})
export class InputRadioPage {}
