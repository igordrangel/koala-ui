import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  InputField,
  InputFieldBase,
} from '@koalarx/ui/shared/components/input-field';

@Component({
  selector: 'kl-input-number',
  templateUrl: './input-number.html',
  imports: [InputField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumber extends InputFieldBase {}
