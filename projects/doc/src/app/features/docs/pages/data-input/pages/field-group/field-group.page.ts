import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { FieldGroupSample } from '../../components/field-group-sample/field-group-sample';

@Component({
  selector: 'app-field-group-page',
  templateUrl: './field-group.page.html',
  imports: [CodeViewer, OnThisPage, FieldGroupSample],
})
export class FieldGroupPage {}
