import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  InputField,
  InputFieldBase,
} from '@koalarx/ui/shared/components/input-field';

@Component({
  selector: 'kl-input-datetime',
  templateUrl: './input-datetime.html',
  imports: [InputField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDatetime extends InputFieldBase {
  min = input<string>();
  max = input<string>();
}
