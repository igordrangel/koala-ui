import { Component, input } from '@angular/core';
import {
  InputField,
  InputFieldBase,
} from '@koalarx/ui/shared/components/input-field';

@Component({
  selector: 'kl-input-time',
  templateUrl: './input-time.html',
  imports: [InputField],
})
export class InputTime extends InputFieldBase {
  min = input<string>();
  max = input<string>();
}
