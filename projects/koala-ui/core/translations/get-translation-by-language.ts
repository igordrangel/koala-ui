import { en } from './en';
import { ptBr } from './ptbr';
import { Translation } from './translation.model';

export type KoalaLanguage = 'en' | 'ptBr';

export function getTranslationByLanguage(language: KoalaLanguage): Translation {
  switch (language) {
    case 'en':
      return en;
    case 'ptBr':
      return ptBr;
  }
}
