import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { DatatableSample } from '../../components/datatable-sample/datatable-sample';

@Component({
  selector: 'app-datatable-page',
  templateUrl: './datatable.page.html',
  imports: [CodeViewer, OnThisPage, DatatableSample],
})
export class DatatablePage {}
