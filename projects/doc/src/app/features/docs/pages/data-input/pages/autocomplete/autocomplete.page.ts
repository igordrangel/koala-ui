import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page/on-this-page';
import { AutocompleteSample } from '../../components/autocomplete-sample/autocomplete-sample';

@Component({
  selector: 'app-autocomplete-page',
  templateUrl: './autocomplete.page.html',
  imports: [CodeViewer, OnThisPage, AutocompleteSample],
})
export class AutocompletePage {}
