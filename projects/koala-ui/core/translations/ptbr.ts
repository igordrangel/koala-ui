import { Translation } from './translation.model';

export const ptBr: Translation = {
  confirm: {
    btnLabelYes: 'Sim',
    btnLabelNo: 'Não',
  },
  codeViewer: {
    copyToClipboard: 'Copiar',
    copiedToClipboard: 'Copiado',
  },
  form: {
    required: 'O campo é obrigatório.',
    invalidEmail: 'E-mail inválido',
    invalidMinLength: (minLength: number) =>
      `O campo deve ter no mínimo ${minLength} caracteres.`,
    invalidCPF: 'CPF inválido',
    invalidCNPJ: 'CNPJ inválido',
    invalidURL: 'URL inválida',
  },
  onThisPage: {
    title: 'Nesta página',
  },
};
