import { ComboboxOption } from '@/shared/components/combobox';
import { SelectOption } from '@/shared/components/select';

export function joinOptionLabels(
  options: (SelectOption<any, any> | ComboboxOption<any, any>)[],
): string {
  return options.map((opt) => opt.label).join(', ');
}
