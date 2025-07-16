import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputEmail } from '@koalarx/ui/shared/components/input-field/input-email';

@Component({
  selector: 'app-input-email-sample',
  templateUrl: './input-email-sample.html',
  imports: [SampleContainer, InputEmail],
})
export class InputEmailSample {
  emailControl = new FormControl('');
}
