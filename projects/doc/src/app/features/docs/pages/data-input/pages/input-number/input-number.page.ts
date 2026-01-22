import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputNumberSample } from '../../components/input-number-sample/input-number-sample';

@Component({
  selector: 'app-input-number-page',
  templateUrl: './input-number.page.html',
  imports: [CodeViewer, OnThisPage, InputNumberSample],
})
export class InputNumberPage {}
