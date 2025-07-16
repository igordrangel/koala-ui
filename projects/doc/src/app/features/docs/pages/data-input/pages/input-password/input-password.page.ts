import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputPasswordSample } from '../../components/input-password-sample/input-password-sample';

@Component({
  selector: 'app-input-password-page',
  templateUrl: './input-password.page.html',
  imports: [CodeViewer, OnThisPage, InputPasswordSample],
})
export class InputPasswordPage {}
