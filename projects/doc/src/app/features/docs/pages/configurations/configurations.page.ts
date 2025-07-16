import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';

@Component({
  selector: 'app-configurations-page',
  templateUrl: './configurations.page.html',
  imports: [CodeViewer, OnThisPage, RouterLink],
})
export class ConfigurationsPage {}
