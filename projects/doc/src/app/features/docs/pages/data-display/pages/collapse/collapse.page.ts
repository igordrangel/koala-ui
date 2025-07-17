import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { CollapseSample } from '../../components/collapse-sample/collapse-sample';

@Component({
  selector: 'app-collapse-page',
  templateUrl: './collapse.page.html',
  imports: [CodeViewer, OnThisPage, CollapseSample],
})
export class CollapsePage {}
