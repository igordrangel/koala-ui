export interface Translation {
  confirm: {
    btnLabelYes: string;
    btnLabelNo: string;
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
}
