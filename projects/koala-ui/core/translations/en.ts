import { Translation } from './translation.model';

export const en: Translation = {
  confirm: {
    btnLabelYes: 'Yes',
    btnLabelNo: 'No',
  },
  codeViewer: {
    copyToClipboard: 'Copy to clipboard',
    copiedToClipboard: 'Copied to clipboard',
  },
  form: {
    required: 'This field is required.',
    invalidEmail: 'Invalid email address',
    invalidMinLength: (minLength: number) =>
      `The field must have at least ${minLength} characters.`,
    invalidCPF: 'Invalid CPF',
    invalidCNPJ: 'Invalid CNPJ',
    invalidURL: 'Invalid URL',
  },
  onThisPage: {
    title: 'On this page',
  },
};
