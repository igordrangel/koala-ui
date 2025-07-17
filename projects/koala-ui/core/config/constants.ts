import { KoalaLanguage, Translation } from '@koalarx/ui/core/translations';
import { HttpClientErrorsMiddleware } from '../middlewares/http-client-errors.middleware';

export const GENERIC_COMPONENT_CONTAINER_NAME =
  '.kl-generic-component-container';

export class AppConfig {
  static hostApi: string | undefined;
  static language: KoalaLanguage;
  static translation: Translation;
  static httpClientErrorsMiddleware: HttpClientErrorsMiddleware | undefined;
}
