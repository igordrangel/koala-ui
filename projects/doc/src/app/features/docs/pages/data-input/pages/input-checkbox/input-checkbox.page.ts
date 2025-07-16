import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputCheckboxSample } from '../../components/input-checkbox-sample/input-checkbox-sample';

@Component({
  selector: 'app-input-checkbox-page',
  templateUrl: './input-checkbox.page.html',
  imports: [CodeViewer, OnThisPage, InputCheckboxSample],
})
export class InputCheckboxPage {}
