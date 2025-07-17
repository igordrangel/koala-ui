import { KoalaLanguage, Translation } from '@koalarx/ui/core/translations';

export const GENERIC_COMPONENT_CONTAINER_NAME =
  '.kl-generic-component-container';

export class AppConfig {
  static hostApi: string | undefined;
  static language: KoalaLanguage;
  static translation: Translation;
}
