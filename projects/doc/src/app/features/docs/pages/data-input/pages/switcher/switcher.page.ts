import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { SwitcherSample } from '../../components/switcher-sample/switcher-sample';

@Component({
  selector: 'app-switcher-page',
  templateUrl: './switcher.page.html',
  imports: [CodeViewer, OnThisPage, SwitcherSample],
})
export class SwitcherPage {}
