import { signal } from '@angular/core';
import { ThemeName } from '@koalarx/ui/theme';

export const GENERIC_COMPONENT_CONTAINER_NAME =
  '.kl-generic-component-container';
export const CURRENT_THEME = signal<ThemeName | null>(null);
