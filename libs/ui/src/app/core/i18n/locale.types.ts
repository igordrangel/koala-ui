export type Locale = 'pt' | 'en';

export const SUPPORTED_LOCALES: Locale[] = ['pt', 'en'];

export const DEFAULT_LOCALE: Locale = 'pt';

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'pt' || value === 'en';
}
