export function coerceValue(value: string): string | number {
  const numericValue = Number(value);
  return isNaN(numericValue) ? value : numericValue;
}
