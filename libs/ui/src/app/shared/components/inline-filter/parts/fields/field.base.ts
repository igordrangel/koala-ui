import { controlChanges } from '@/shared/utils/control-changes';
import { formIsValid } from '@/shared/utils/form-is-valid';
import { isMobile } from '@/shared/utils/is-mobile';
import { Directive, effect, input, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InlineFilterField } from '../../config';

@Directive()
export abstract class FieldBase {
  readonly config = input.required<InlineFilterField>();
  readonly isMobile = isMobile();

  readonly valueControl = new FormControl();
  readonly valueChanges = controlChanges(this.valueControl);
  readonly valid = formIsValid(this.valueControl);

  readonly isInvalid = output<boolean>();
  readonly data = output<any>();

  constructor() {
    effect(() => {
      this.valueControl.setValue(this.config().value());
    });

    effect(() => {
      const config = this.config();

      if (config.validators) {
        this.valueControl.setValidators(config.validators);
      }
    });

    effect(() => {
      const isInvalid = !this.valid();
      const value = this.valueChanges();

      this.config().invalid.set(isInvalid);
      this.config().value.set(isInvalid ? null : value);
      this.isInvalid.emit(isInvalid);
    });
  }
}
