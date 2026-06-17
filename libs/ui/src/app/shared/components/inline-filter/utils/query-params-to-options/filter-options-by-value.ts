import { ComboboxOption } from '@/shared/components/combobox';
import { SelectOption } from '@/shared/components/select';
import { normalizeValue } from './normalize-value';

export function filterOptionsByValue(
  options: (SelectOption<any, any> | ComboboxOption<any, any>)[],
  value: string | string[],
) {
  const normalizedValue = normalizeValue(value);

  return options.filter((opt) =>
    Array.isArray(normalizedValue)
      ? normalizedValue.includes(opt.value)
      : opt.value === normalizedValue,
  );
}
