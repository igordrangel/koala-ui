import { coerceValue } from './coerce-value';

export function normalizeValue(value: string | string[]): string | number | (string | number)[] {
  if (Array.isArray(value)) {
    return value.map(coerceValue);
  } else {
    return coerceValue(value);
  }
}
