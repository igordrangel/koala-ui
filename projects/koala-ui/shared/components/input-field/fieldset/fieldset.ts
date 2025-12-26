import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldGroup } from '@koalarx/ui/shared/components/input-field/field-group';

@Component({
  selector: 'kl-fieldset',
  templateUrl: './fieldset.html',
  imports: [FieldGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fieldset {}
