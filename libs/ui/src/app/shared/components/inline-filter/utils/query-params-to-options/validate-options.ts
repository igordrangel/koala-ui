import { validateCnpj, validateCpf } from '@koalarx/utils/KlString';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { InlineFilterField } from '../../config';
import { coerceValue } from './coerce-value';

function hasRequiredValidator(validators?: ValidatorFn | ValidatorFn[]): boolean {
  if (!validators) {
    return false;
  }
  const list = Array.isArray(validators) ? validators : [validators];
  return list.includes(Validators.required);
}

function runConfigValidators(
  validators: ValidatorFn | ValidatorFn[] | undefined,
  value: unknown,
): boolean {
  if (!validators) {
    return true;
  }

  const list = Array.isArray(validators) ? validators : [validators];
  const control = { value } as AbstractControl;

  for (const validator of list) {
    if (validator === Validators.required) {
      continue;
    }
    if (validator(control)) {
      return false;
    }
  }

  return true;
}

export function validateOption(option: InlineFilterField, queryParam: string | string[]): boolean {
  const value = Array.isArray(queryParam) ? queryParam.map(coerceValue) : coerceValue(queryParam);

  if (hasRequiredValidator(option.validators)) {
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
      return false;
    }
  }

  if (option.inputType === 'cpf') {
    return typeof value === 'string' ? validateCpf(value) : false;
  }

  if (option.inputType === 'cnpj') {
    return typeof value === 'string' ? validateCnpj(value) : false;
  }

  if (option.inputType === 'email' && value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
  }

  return runConfigValidators(option.validators, value);
}
