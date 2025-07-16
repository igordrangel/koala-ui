import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputUrlSample } from '../../components/input-url-sample/input-url-sample';

@Component({
  selector: 'app-input-url-page',
  templateUrl: './input-url.page.html',
  imports: [CodeViewer, OnThisPage, InputUrlSample],
})
export class InputUrlPage {}
