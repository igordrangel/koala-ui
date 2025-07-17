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
    invalidPasswordHasSpecialCharacters:
      'The password must contain special characters.',
    invalidPasswordHasLowercase: 'The password must contain lowercase letters.',
    invalidPasswordHasUppercase: 'The password must contain uppercase letters.',
    invalidPasswordHasNumber: 'The password must contain numbers.',
    invalidConfirmPassword: 'The confirmation password does not match.',
  },
  onThisPage: {
    title: 'On this page',
  },
  datatable: {
    btnFilterLabel: 'Filter',
    clearFilterTooltip: 'Clear filters',
    addFilterTooltip: 'Add filter',
    reloadListTooltip: 'Reload data',
    labelItemsPerPage: 'Items per page limit',
  },
};
