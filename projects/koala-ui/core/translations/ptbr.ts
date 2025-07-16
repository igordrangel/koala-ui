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
    invalidPasswordHasSpecialCharacters:
      'A senha deve conter caracteres especiais.',
    invalidPasswordHasLowercase: 'A senha deve conter letras minúsculas.',
    invalidPasswordHasUppercase: 'A senha deve conter letras maiúsculas.',
    invalidPasswordHasNumber: 'A senha deve conter números.',
    invalidConfirmPassword: 'A confirmação da senha não confere.',
  },
  onThisPage: {
    title: 'Nesta página',
  },
};
