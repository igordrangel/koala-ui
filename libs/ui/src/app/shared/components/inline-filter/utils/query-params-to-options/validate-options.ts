import { validateCnpj, validateCpf } from '@koalarx/utils/KlString';
import { ValidatorFn, Validators } from '@angular/forms';
import { InlineFilterField } from '../../config';
import { coerceValue } from './coerce-value';

function hasRequiredValidator(validators?: ValidatorFn | ValidatorFn[]): boolean {
  if (!validators) {
    return false;
  }
  const list = Array.isArray(validators) ? validators : [validators];
  return list.includes(Validators.required);
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

  return true;
}
