import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { TooltipSample } from '../../components/tooltip-sample/tooltip-sample';

@Component({
  selector: 'app-tooltip-page',
  templateUrl: './tooltip.page.html',
  imports: [CodeViewer, OnThisPage, TooltipSample],
})
export class TooltipPage {}
