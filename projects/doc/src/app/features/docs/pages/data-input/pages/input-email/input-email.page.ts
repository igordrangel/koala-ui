import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputEmailSample } from '../../components/input-email-sample/input-email-sample';

@Component({
  selector: 'app-input-email-page',
  templateUrl: './input-email.page.html',
  imports: [CodeViewer, OnThisPage, InputEmailSample],
})
export class InputEmailPage {}
