import { effect, Signal } from '@angular/core';
import { InputCalendarFormat, InputCalendarType } from '..';
import { parseMonthValue } from '../input-calendar.helpers';

interface SetupTriggerLabelEffectParams {
  value: Signal<string>;
  placeholder: Signal<string>;
  type: Signal<InputCalendarType>;
  format: Signal<InputCalendarFormat>;
  triggerLabel: () => HTMLSpanElement | undefined;
  getDisplayValue: (value: string, type: InputCalendarType, format: InputCalendarFormat) => string;
}

interface SetupMonthDisplayYearEffectParams {
  type: Signal<InputCalendarType>;
  value: Signal<string>;
  setDisplayedYear: (value: number) => void;
}

export function setupTriggerLabelEffect(params: SetupTriggerLabelEffectParams): void {
  effect(() => {
    const value = params.value();
    const label = params.triggerLabel();

    if (!label) {
      return;
    }

    label.classList.remove('opacity-60');

    if (!value) {
      label.innerText = params.placeholder();
      label.classList.add('opacity-60');
      return;
    }

    label.innerText = params.getDisplayValue(value, params.type(), params.format());
  });
}

export function setupMonthDisplayYearEffect(params: SetupMonthDisplayYearEffectParams): void {
  effect(() => {
    if (params.type() !== 'month') {
      return;
    }

    const monthValue = parseMonthValue(params.value());

    if (monthValue) {
      params.setDisplayedYear(monthValue.year);
    }
  });
}
