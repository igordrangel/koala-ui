import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { SelectSample } from '../../components/select-sample/select-sample';

@Component({
  selector: 'app-select-page',
  templateUrl: './select.page.html',
  imports: [CodeViewer, OnThisPage, SelectSample],
})
export class SelectPage {}
