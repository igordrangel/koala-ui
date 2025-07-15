import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { Loader } from '@koalarx/ui/core/components/loader';

@Component({
  selector: 'app-loader-sample',
  templateUrl: './loader-sample.html',
  imports: [SampleContainer, Loader],
})
export class LoaderSample {}
