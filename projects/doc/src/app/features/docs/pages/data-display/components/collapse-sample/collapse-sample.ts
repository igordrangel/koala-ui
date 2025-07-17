import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { Collapse } from '@koalarx/ui/shared/components/collapse';

@Component({
  selector: 'app-collapse-sample',
  templateUrl: './collapse-sample.html',
  imports: [SampleContainer, Collapse],
})
export class CollapseSample {}
