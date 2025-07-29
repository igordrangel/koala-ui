import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';

@Component({
  selector: 'app-auth-configuration',
  templateUrl: './auth-configuration.page.html',
  imports: [CodeViewer, OnThisPage],
})
export class AuthConfigurationPage {}
