import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { Accordion } from '@koalarx/ui/shared/components/accordion';

@Component({
  selector: 'app-accordion-sample',
  templateUrl: './accordion-sample.html',
  imports: [SampleContainer, Accordion],
})
export class AccordionSample {}
