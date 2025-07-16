import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { FieldsetSample } from '../../components/fieldset-sample/fieldset-sample';

@Component({
  selector: 'app-fieldset-page',
  templateUrl: './fieldset.page.html',
  imports: [CodeViewer, OnThisPage, FieldsetSample],
})
export class FieldsetPage {}
