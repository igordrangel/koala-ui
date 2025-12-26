import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  InputField,
  InputFieldBase,
} from '@koalarx/ui/shared/components/input-field';

@Component({
  selector: 'kl-input-month',
  templateUrl: './input-month.html',
  imports: [InputField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMonth extends InputFieldBase {
  min = input<string>();
  max = input<string>();
}
