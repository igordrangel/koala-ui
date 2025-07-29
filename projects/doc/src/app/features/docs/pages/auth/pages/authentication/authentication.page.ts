import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { AuthenticationSample } from '../../components/authentication-sample/authentication-sample';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication.page.html',
  imports: [CodeViewer, OnThisPage, AuthenticationSample],
})
export class AuthenticationPage {}
