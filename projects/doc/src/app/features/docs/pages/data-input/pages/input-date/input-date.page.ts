import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputDateSample } from '../../components/input-date-sample/input-date-sample';

@Component({
  selector: 'app-input-date-page',
  templateUrl: './input-date.page.html',
  imports: [CodeViewer, OnThisPage, InputDateSample],
})
export class InputDatePage {}
