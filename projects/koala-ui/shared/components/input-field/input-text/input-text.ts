import { Component, input } from '@angular/core';
import {
  InputField,
  InputFieldBase,
} from '@koalarx/ui/shared/components/input-field';

@Component({
  selector: 'kl-input-text',
  templateUrl: './input-text.html',
  imports: [InputField],
})
export class InputText extends InputFieldBase {
  mask = input<string>('');
}
