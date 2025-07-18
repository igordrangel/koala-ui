import { Injectable } from '@angular/core';
import { HttpClientErrorsMiddleware } from '@koalarx/ui/core/middlewares';
import { KoalaLanguage, Translation, en } from '@koalarx/ui/core/translations';

@Injectable({ providedIn: 'root' })
export class AppConfig {
  private _hostApi: string | undefined;
  private _language: KoalaLanguage | undefined;
  private _translation: Translation | undefined;
  private _httpClientErrorsMiddleware: HttpClientErrorsMiddleware | undefined;

  set hostApi(hostApi: string | undefined) {
    this._hostApi = hostApi;
  }

  get hostApi(): string | undefined {
    return this._hostApi;
  }

  set language(language: KoalaLanguage | undefined) {
    this._language = language;
  }

  get language(): KoalaLanguage | undefined {
    return this._language;
  }

  set translation(translation: Translation | undefined) {
    this._translation = translation;
  }

  get translation(): Translation {
    return this._translation ?? en;
  }

  set httpClientErrorsMiddleware(
    httpClientErrorsMiddleware: HttpClientErrorsMiddleware | undefined
  ) {
    this._httpClientErrorsMiddleware = httpClientErrorsMiddleware;
  }

  get httpClientErrorsMiddleware(): HttpClientErrorsMiddleware | undefined {
    return this._httpClientErrorsMiddleware;
  }
}
