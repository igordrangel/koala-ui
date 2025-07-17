import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { AccordionSample } from '../../components/accordion-sample/accordion-sample';

@Component({
  selector: 'app-accordion-page',
  templateUrl: './accordion.page.html',
  imports: [CodeViewer, OnThisPage, AccordionSample],
})
export class AccordionPage {}
