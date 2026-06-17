import { CnpjValidator } from '@/shared/validators/cnpj.validator';
import { CpfValidator } from '@/shared/validators/cpf.validator';
import { FormControl } from '@angular/forms';
import { InlineFilterField } from '../../config';
import { coerceValue } from './coerce-value';

export function validateOption(option: InlineFilterField, queryParam: string | string[]): boolean {
  const value = Array.isArray(queryParam) ? queryParam.map(coerceValue) : coerceValue(queryParam);
  const validators = option.validators;

  const formControl = new FormControl(value, validators);

  if (option.inputType === 'cpf') {
    formControl.addValidators(CpfValidator);
  } else if (option.inputType === 'cnpj') {
    formControl.addValidators(CnpjValidator);
  }

  formControl.updateValueAndValidity();

  return formControl.valid;
}
