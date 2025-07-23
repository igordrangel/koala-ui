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
  datatable: {
    btnFilterLabel: 'Filtro',
    clearFilterTooltip: 'Limpar filtros',
    addFilterTooltip: 'Adicionar filtro',
    reloadListTooltip: 'Recarregar dados',
    labelItemsPerPage: 'Limite de itens por carregamento',
    paginatorPagesFeedback: (currentPage: number, lastPage: number) =>
      `Página ${currentPage} de ${lastPage}`,
  },
  feedbackRequestInterceptor: {
    '400': 'Ocorreu um erro relacionado aos dados enviados',
    '401': 'Acesso não autorizado, por favor, faça login novamente.',
    '403': 'Acesso negado.',
    '404': 'Nenhum registro encontrado a partir dos dados informados.',
    '409': 'Este registro já existe',
    '422': 'Erro de validação nos dados enviados.',
    '500': 'Entre em contato com nosso suporte pelo canal do whatsapp.',
    '0': 'Identificamos uma instabilidade na comunicação com nosso servidor, isto pode ocorrer devido a rápidas quedas de internet, conexão lenta ou sobrecarga no servidor, por favor, tente novamente.',
    unknowError: 'Ocorreu um erro desconhecido, por favor, tente novamente.',
  },
};
