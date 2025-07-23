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
    paginatorPagesFeedback: (currentPage: number, lastPage: number) =>
      `Page ${currentPage} of ${lastPage}`,
  },
  feedbackRequestInterceptor: {
    '400': 'An error occurred related to the submitted data',
    '401': 'Unauthorized access, please log in again.',
    '403': 'Access denied.',
    '404': 'No record found from the provided data.',
    '409': 'This record already exists',
    '422': 'Validation error in the submitted data.',
    '500': 'Please contact our support via WhatsApp.',
    '0': 'We identified an instability in communication with our server, this may occur due to rapid internet drops, slow connection, or server overload, please try again.',
    unknowError: 'An unknown error occurred, please try again.',
  },
};
