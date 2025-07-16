import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputUrl } from '@koalarx/ui/shared/components/input-field/input-url';

@Component({
  selector: 'app-input-url-sample',
  templateUrl: './input-url-sample.html',
  imports: [SampleContainer, InputUrl],
})
export class InputUrlSample {
  urlControl = new FormControl('');
}
