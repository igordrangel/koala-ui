import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputMonthSample } from '../../components/input-month-sample/input-month-sample';

@Component({
  selector: 'app-input-month-page',
  templateUrl: './input-month.page.html',
  imports: [CodeViewer, OnThisPage, InputMonthSample],
})
export class InputMonthPage {}
