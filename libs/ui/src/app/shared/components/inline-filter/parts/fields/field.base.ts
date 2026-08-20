import { isMobile } from '@/shared/utils/is-mobile';
import { Directive, effect, input, output, signal } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { form, validate } from '@angular/forms/signals';
import { validateCnpj, validateCpf } from '@koalarx/utils/KlString';
import { InlineFilterField } from '../../config';

@Directive()
export abstract class FieldBase {
  readonly config = input.required<InlineFilterField>();
  readonly isMobile = isMobile();

  protected readonly model = signal<{ value: any }>({ value: null });

  readonly valueForm = form(this.model, (schema) => {
    validate(schema.value, ({ value }) => {
      const config = this.config();
      const current = value();

      if (config.inputType === 'email' && current) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(String(current))) {
          return { kind: 'email', message: 'Invalid email' };
        }
      }

      if (config.inputType === 'cpf' && current) {
        return validateCpf(String(current))
          ? undefined
          : { kind: 'cpfInvalid', message: 'CPF inválido' };
      }

      if (config.inputType === 'cnpj' && current) {
        return validateCnpj(String(current))
          ? undefined
          : { kind: 'cnpjInvalid', message: 'CNPJ inválido' };
      }

      const validatorError = this.runConfigValidators(config.validators, current, config.label);
      if (validatorError) {
        return validatorError;
      }

      return undefined;
    });
  });

  readonly isInvalid = output<boolean>();
  readonly data = output<any>();

  /** Bridge Reactive Forms `ValidatorFn` into Signal Forms `validate`. */
  protected runConfigValidators(
    validators: ValidatorFn | ValidatorFn[] | undefined,
    current: unknown,
    label: string,
  ) {
    if (!validators) {
      return undefined;
    }

    const list = Array.isArray(validators) ? validators : [validators];
    const control = { value: current } as AbstractControl;

    for (const validator of list) {
      const errors = validator(control);
      if (errors) {
        const kind = Object.keys(errors)[0] ?? 'invalid';
        return { kind, message: `${label} is invalid` };
      }
    }

    return undefined;
  }

  constructor() {
    effect(() => {
      const configValue = this.config().value();
      if (this.model().value !== configValue) {
        this.model.set({ value: configValue });
      }
    });

    effect(() => {
      const field = this.valueForm.value;
      const value = field().value();
      const isInvalid = !field().valid();

      this.config().invalid.set(isInvalid);
      this.config().value.set(isInvalid ? null : value);
      this.isInvalid.emit(isInvalid);
    });
  }
}
