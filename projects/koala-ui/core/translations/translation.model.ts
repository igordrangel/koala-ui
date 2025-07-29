export interface Translation {
  confirm: {
    btnLabelYes: string;
    btnLabelNo: string;
    askAreYouSureMessage: string;
  };
  codeViewer: {
    copyToClipboard: string;
    copiedToClipboard: string;
  };
  form: {
    required: string;
    invalidEmail: string;
    invalidMinLength: (requiredLength: number) => string;
    invalidCPF: string;
    invalidCNPJ: string;
    invalidURL: string;
    invalidPasswordHasSpecialCharacters: string;
    invalidPasswordHasLowercase: string;
    invalidPasswordHasUppercase: string;
    invalidPasswordHasNumber: string;
    invalidConfirmPassword: string;
  };
  onThisPage: {
    title: string;
  };
  datatable: {
    btnFilterLabel: string;
    clearFilterTooltip: string;
    addFilterTooltip: string;
    reloadListTooltip: string;
    labelItemsPerPage: string;
    loadMoreBtnLabel: string;
    paginatorPagesFeedback: (currentPage: number, lastPage: number) => string;
  };
  feedbackRequestInterceptor: {
    '400': string;
    '401': string;
    '403': string;
    '404': string;
    '409': string;
    '422': string;
    '500': string;
    '0': string;
    unknowError: string;
  };
  jwtAuthorizationService: {
    questionLogoutMessage: string;
  };
}
