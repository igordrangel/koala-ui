import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { ConfirmSample } from '../../components/confirm/confirm-sample';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm.page.html',
  imports: [CodeViewer, OnThisPage, ConfirmSample],
})
export class ConfirmPage {}
