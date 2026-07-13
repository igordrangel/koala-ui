import { UrlMatchResult, UrlSegment } from '@angular/router';
import { isLocale } from './locale.types';

export function localeMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (!segments.length || !isLocale(segments[0].path)) {
    return null;
  }

  return {
    consumed: [segments[0]],
    posParams: { locale: segments[0] },
  };
}
