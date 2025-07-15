import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { DialogSample } from '../../components/dialog/dialog-sample';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog.page.html',
  imports: [CodeViewer, OnThisPage, DialogSample],
})
export class DialogPage {}
