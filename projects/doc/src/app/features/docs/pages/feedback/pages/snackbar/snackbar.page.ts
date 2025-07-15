import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { SnackbarSample } from '../../components/snackbar-sample/snackbar-sample';

@Component({
  selector: 'app-snackbar-page',
  templateUrl: './snackbar.page.html',
  imports: [CodeViewer, OnThisPage, SnackbarSample],
})
export class SnackbarPage {}
