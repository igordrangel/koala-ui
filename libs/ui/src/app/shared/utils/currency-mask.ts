export interface CurrencyMaskOptions {
  currencyAlias?: string;
  decimalDigits?: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
  fixedDecimalScale?: boolean;
}

export function currencyMask(value: string, options: CurrencyMaskOptions = {}): string {
  const {
    currencyAlias = 'R$',
    decimalDigits = 2,
    thousandSeparator = '.',
    decimalSeparator = ',',
    fixedDecimalScale = true,
  } = options;

  const safeDecimalDigits = Number.isFinite(decimalDigits)
    ? Math.max(0, Math.trunc(decimalDigits))
    : 2;
  const hasDecimalSeparator = value.includes(decimalSeparator);
  const [rawInteger = '', ...decimalParts] = value.split(decimalSeparator);

  const integerDigits = rawInteger.replace(/\D/g, '');
  const normalizedIntegerDigits = integerDigits.replace(/^0+(?=\d)/, '');
  const decimalDigitsOnly = decimalParts.join('').replace(/\D/g, '');

  if (!normalizedIntegerDigits && !hasDecimalSeparator) {
    return '';
  }

  const formattedInteger = (normalizedIntegerDigits || '0').replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator,
  );

  if (safeDecimalDigits === 0) {
    return currencyAlias ? `${currencyAlias} ${formattedInteger}` : formattedInteger;
  }

  const formattedDecimal = fixedDecimalScale
    ? decimalDigitsOnly.slice(0, safeDecimalDigits).padEnd(safeDecimalDigits, '0')
    : decimalDigitsOnly.slice(0, safeDecimalDigits);

  const shouldShowDecimalPart = fixedDecimalScale || hasDecimalSeparator;
  const currencyValue = shouldShowDecimalPart
    ? `${formattedInteger}${decimalSeparator}${formattedDecimal}`
    : formattedInteger;

  return currencyAlias ? `${currencyAlias} ${currencyValue}` : currencyValue;
}
