import { KlDate } from '@koalarx/utils/KlDate';
import { InlineFilterField } from '../../config';

export function toCalendar(option: InlineFilterField, value: string) {
  const date = new KlDate(`${value}T00:00:00`);

  if (isNaN(date.getTime())) {
    return;
  }

  option.templateValue.set(date.format('dd/MM/yyyy'));
}
