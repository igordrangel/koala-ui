import type { Locale } from '../locale.types';

export type DocsCommon = {
  installation: string;
  usage: string;
  api: string;
  sample: string;
  preview: string;
  html: string;
  ts: string;
  htmlTrigger: string;
  tsTrigger: string;
  htmlDialog: string;
  tsDialog: string;
  htmlWindow: string;
  tsWindow: string;
  formHtmlPage: string;
  formTsPage: string;
  loggedHtmlPage: string;
  loggedTsPage: string;
  variants: string;
  sizes: string;
  disabled: string;
  installCliHint: (name: string) => string;
};

const commonPt: DocsCommon = {
  installation: 'Instalação',
  usage: 'Uso',
  api: 'API',
  sample: 'Exemplo',
  preview: 'Preview',
  html: 'HTML',
  ts: 'TS',
  htmlTrigger: 'HTML Trigger',
  tsTrigger: 'TS Trigger',
  htmlDialog: 'HTML Dialog',
  tsDialog: 'TS Dialog',
  htmlWindow: 'HTML Window',
  tsWindow: 'TS Window',
  formHtmlPage: 'Form HTML Page',
  formTsPage: 'Form TS Page',
  loggedHtmlPage: 'Logged HTML Page',
  loggedTsPage: 'Logged TS Page',
  variants: 'Variantes',
  sizes: 'Tamanhos',
  disabled: 'Desabilitado',
  installCliHint: (name) => `Use o Koala CLI para gerar o componente ${name}.`,
};

const commonEn: DocsCommon = {
  installation: 'Installation',
  usage: 'Usage',
  api: 'API',
  sample: 'Sample',
  preview: 'Preview',
  html: 'HTML',
  ts: 'TS',
  htmlTrigger: 'HTML Trigger',
  tsTrigger: 'TS Trigger',
  htmlDialog: 'HTML Dialog',
  tsDialog: 'TS Dialog',
  htmlWindow: 'HTML Window',
  tsWindow: 'TS Window',
  formHtmlPage: 'Form HTML Page',
  formTsPage: 'Form TS Page',
  loggedHtmlPage: 'Logged HTML Page',
  loggedTsPage: 'Logged TS Page',
  variants: 'Variants',
  sizes: 'Sizes',
  disabled: 'Disabled',
  installCliHint: (name) => `Use the Koala CLI to generate a new ${name} component.`,
};

export const DOCS_COMMON: Record<Locale, DocsCommon> = {
  pt: commonPt,
  en: commonEn,
};

export function docsCommon(locale: Locale): DocsCommon {
  return DOCS_COMMON[locale];
}
