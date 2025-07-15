import { en } from './en';
import { ptBr } from './ptbr';
import { Translation } from './translation.model';

export type KoalaLanguage = 'en' | 'ptBr';

export class CurrentTranslation {
  private static _translation: Translation;

  static defineLanguage(language: KoalaLanguage): void {
    switch (language) {
      case 'en':
        this._translation = en;
        break;
      case 'ptBr':
        this._translation = ptBr;
        break;
    }
  }

  static get() {
    return this._translation;
  }
}
