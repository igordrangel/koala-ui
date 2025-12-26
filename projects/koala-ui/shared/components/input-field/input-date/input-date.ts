import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  InputField,
  InputFieldBase,
} from '@koalarx/ui/shared/components/input-field';

@Component({
  selector: 'kl-input-date',
  templateUrl: './input-date.html',
  imports: [InputField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDate extends InputFieldBase {
  min = input<string>();
  max = input<string>();
}
