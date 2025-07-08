import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page/on-this-page';

@Component({
  selector: 'kl-installation-page',
  templateUrl: './installation.page.html',
  imports: [CodeViewer, OnThisPage],
})
export class InstallationPage {}
