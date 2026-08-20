import { isMobile } from '@/shared/utils/is-mobile';
import { Directive, effect, input, output, signal } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
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

      if (this.hasRequiredValidator(config.validators)) {
        if (current == null || current === '' || (Array.isArray(current) && current.length === 0)) {
          return { kind: 'required', message: `${config.label} is required` };
        }
      }

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

      return undefined;
    });
  });

  readonly isInvalid = output<boolean>();
  readonly data = output<any>();

  protected hasRequiredValidator(validators?: ValidatorFn | ValidatorFn[]): boolean {
    if (!validators) {
      return false;
    }
    const list = Array.isArray(validators) ? validators : [validators];
    return list.includes(Validators.required);
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
