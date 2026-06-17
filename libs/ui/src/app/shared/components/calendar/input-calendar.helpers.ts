import { KlDate } from '@koalarx/utils/light/KlDate';
import { InputCalendarFormat, InputCalendarType } from '.';

export interface CalendarMonthValue {
  year: number;
  month: number;
}

export interface CalendarMonthOption {
  monthIndex: number;
  label: string;
}

export function createMonthOptions(locale = 'pt-BR'): CalendarMonthOption[] {
  return Array.from({ length: 12 }, (_, monthIndex) => ({
    monthIndex,
    label: new Intl.DateTimeFormat(locale, { month: 'short' })
      .format(new Date(2000, monthIndex, 1))
      .replace('.', ''),
  }));
}

export function getDatePart(value: string): string {
  return value.split('T')[0] ?? '';
}

export function getTimePart(value: string): string {
  return value.split('T')[1]?.slice(0, 5) ?? '';
}

export function parseMonthValue(value: string): CalendarMonthValue | undefined {
  const result = /^(\d{4})-(\d{2})$/.exec(value);

  if (!result) {
    return undefined;
  }

  const year = Number(result[1]);
  const month = Number(result[2]) - 1;

  if (!Number.isInteger(year) || month < 0 || month > 11) {
    return undefined;
  }

  return { year, month };
}

function toKlDate(value: string): KlDate | undefined {
  try {
    return new KlDate(value.includes('T') ? value : `${value}T00:00:00`);
  } catch {
    return undefined;
  }
}

function formatDate(value: string, format: InputCalendarFormat): string {
  const dateValue = toKlDate(value);
  return dateValue && dateValue.toString() !== 'Invalid Date' ? dateValue.format(format) : value;
}

function formatDateTime(value: string, format: InputCalendarFormat): string {
  const dateValue = toKlDate(value);
  const timeValue = getTimePart(value);

  if (!dateValue || !timeValue) {
    return value;
  }

  return `${dateValue.format(format)} ${timeValue}`;
}

function formatMonth(value: string): string {
  const monthValue = parseMonthValue(value);

  if (!monthValue) {
    return value;
  }

  const dateValue = toKlDate(
    `${String(monthValue.year).padStart(4, '0')}-${String(monthValue.month + 1).padStart(2, '0')}-01`,
  );

  if (!dateValue) {
    return value;
  }

  return `${String(dateValue.getMonth() + 1).padStart(2, '0')}/${dateValue.getFullYear()}`;
}

function formatDateRange(value: string, format: InputCalendarFormat): string {
  const [startDate, endDate] = value.split('/');

  if (!startDate || !endDate) {
    return value;
  }

  return `${formatDate(startDate, format)} - ${formatDate(endDate, format)}`;
}

export function getDisplayValue(
  value: string,
  type: InputCalendarType,
  format: InputCalendarFormat,
): string {
  switch (type) {
    case 'daterange':
      return formatDateRange(value, format);
    case 'datetime':
      return formatDateTime(value, format);
    case 'month':
      return formatMonth(value);
    default:
      return formatDate(value, format);
  }
}

export function toSelectedDateValue(
  date: KlDate,
  type: InputCalendarType,
  currentValue: string,
): string {
  if (type === 'month') {
    return date.format('yyyy-MM');
  }

  if (type === 'datetime') {
    const timeValue = getTimePart(currentValue) || '00:00';
    return `${date.format('yyyy-MM-dd')}T${timeValue}`;
  }

  return date.format('yyyy-MM-dd');
}

function isValidDateParts(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  return (
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day
  );
}

function parseDateByFormat(value: string, format: InputCalendarFormat): string | undefined {
  const normalizedValue = value.trim();

  let result: RegExpExecArray | null = null;

  switch (format) {
    case 'dd/MM/yyyy':
    case 'MM/dd/yyyy':
      result = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(normalizedValue);
      break;
    case 'yyyy/MM/dd':
      result = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(normalizedValue);
      break;
  }

  if (!result) {
    return undefined;
  }

  const first = Number(result[1]);
  const second = Number(result[2]);
  const third = Number(result[3]);

  let year = 0;
  let month = 0;
  let day = 0;

  switch (format) {
    case 'dd/MM/yyyy':
      day = first;
      month = second;
      year = third;
      break;
    case 'MM/dd/yyyy':
      month = first;
      day = second;
      year = third;
      break;
    case 'yyyy/MM/dd':
      year = first;
      month = second;
      day = third;
      break;
  }

  if (!isValidDateParts(year, month, day)) {
    return undefined;
  }

  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseMonthInput(value: string): string | undefined {
  const result = /^(\d{2})\/(\d{4})$/.exec(value.trim());

  if (!result) {
    return undefined;
  }

  const month = Number(result[1]);
  const year = Number(result[2]);

  if (!Number.isInteger(year) || month < 1 || month > 12) {
    return undefined;
  }

  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}`;
}

function parseDateTimeInput(value: string, format: InputCalendarFormat): string | undefined {
  const [datePart, timePart] = value.trim().split(' ');

  if (!datePart || !timePart) {
    return undefined;
  }

  const dateValue = parseDateByFormat(datePart, format);
  const timeResult = /^(\d{2}):(\d{2})$/.exec(timePart);

  if (!dateValue || !timeResult) {
    return undefined;
  }

  const hours = Number(timeResult[1]);
  const minutes = Number(timeResult[2]);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return undefined;
  }

  return `${dateValue}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function parseDateRangeInput(value: string, format: InputCalendarFormat): string | undefined {
  const [startDate, endDate] = value.split(/\s-\s/);

  if (!startDate || !endDate) {
    return undefined;
  }

  const parsedStart = parseDateByFormat(startDate, format);
  const parsedEnd = parseDateByFormat(endDate, format);

  if (!parsedStart || !parsedEnd) {
    return undefined;
  }

  return `${parsedStart}/${parsedEnd}`;
}

function normalizeDateRangeInput(value: string): string {
  if (!value) {
    return value;
  }

  return value.replace(/^\s*-\s*/, '');
}

export function normalizeInputText(value: string, type: InputCalendarType): string {
  return type === 'daterange' ? normalizeDateRangeInput(value) : value;
}

function toDateMask(format: InputCalendarFormat): string {
  return format.replace(/[dMy]/g, '0');
}

export function getInputMask(type: InputCalendarType, format: InputCalendarFormat): string {
  const dateMask = toDateMask(format);

  switch (type) {
    case 'datetime':
      return `${dateMask} 00:00`;
    case 'month':
      return '00/0000';
    case 'daterange':
      return `${dateMask} - ${dateMask}`;
    default:
      return dateMask;
  }
}

export function parseInputValue(
  value: string,
  type: InputCalendarType,
  format: InputCalendarFormat,
): string | undefined {
  const normalizedValue = normalizeInputText(value, type).trim();

  if (!normalizedValue) {
    return '';
  }

  switch (type) {
    case 'datetime':
      return parseDateTimeInput(normalizedValue, format);
    case 'month':
      return parseMonthInput(normalizedValue);
    case 'daterange':
      return parseDateRangeInput(normalizedValue, format);
    default:
      return parseDateByFormat(normalizedValue, format);
  }
}
