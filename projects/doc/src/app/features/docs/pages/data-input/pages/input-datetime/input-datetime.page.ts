import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page/on-this-page';
import { InputDatetimeSample } from '../../components/input-datetime-sample/input-datetime-sample';

@Component({
  selector: 'app-input-datetime-page',
  templateUrl: './input-datetime.page.html',
  imports: [CodeViewer, OnThisPage, InputDatetimeSample],
})
export class InputDatetimePage {}
