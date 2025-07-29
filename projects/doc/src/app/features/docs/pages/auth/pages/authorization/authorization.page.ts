import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization.page.html',
  imports: [CodeViewer, OnThisPage],
})
export class AuthorizationPage {}
