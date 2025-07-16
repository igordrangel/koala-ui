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
  };
  onThisPage: {
    title: string;
  };
}
