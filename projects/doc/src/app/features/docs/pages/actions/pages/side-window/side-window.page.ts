import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { SideWindowSample } from '../../components/side-window/side-window-sample';

@Component({
  selector: 'app-side-window-page',
  templateUrl: './side-window.page.html',
  imports: [CodeViewer, OnThisPage, SideWindowSample],
})
export class SideWindowPage {}
