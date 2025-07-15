import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { LoaderSample } from '../../components/loader-sample/loader-sample';

@Component({
  selector: 'app-loader-page',
  templateUrl: './loader.page.html',
  imports: [CodeViewer, OnThisPage, LoaderSample],
})
export class LoaderPage {}
