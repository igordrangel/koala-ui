import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { AlertSample } from '../../components/alert-sample/alert-sample';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert.page.html',
  imports: [CodeViewer, OnThisPage, AlertSample],
})
export class AlertPage {}
