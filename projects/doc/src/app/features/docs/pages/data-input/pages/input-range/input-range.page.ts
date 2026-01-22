import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputRangeSample } from '../../components/input-range-sample/input-range-sample';

@Component({
  selector: 'app-input-range-page',
  templateUrl: './input-range.page.html',
  imports: [CodeViewer, OnThisPage, InputRangeSample],
})
export class InputRangePage {}
