import { differenceInDays } from 'date-fns';

export const validarCPF = (cpf: string): boolean => {
  // Remove formatação
  const cpfLimpo = cpf.replace(/[^\d]/g, '');
  
  if (cpfLimpo.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpfLimpo)) return false;
  
  // Validação dos dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  
  let digito1 = 11 - (soma % 11);
  if (digito1 > 9) digito1 = 0;
  
  if (parseInt(cpfLimpo.charAt(9)) !== digito1) return false;
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  
  let digito2 = 11 - (soma % 11);
  if (digito2 > 9) digito2 = 0;
  
  return parseInt(cpfLimpo.charAt(10)) === digito2;
};

export const formatarCPF = (cpf: string): string => {
  const cpfLimpo = cpf.replace(/[^\d]/g, '');
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const validarEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const calcularDiasAtraso = (prazo: Date): number => {
  const hoje = new Date();
  return Math.max(0, differenceInDays(hoje, prazo));
};

export const verificarVencimento = (dataValidade: Date, diasAviso: number = 30): {
  vencido: boolean;
  proximoVencimento: boolean;
  diasRestantes: number;
} => {
  const hoje = new Date();
  const diasRestantes = differenceInDays(dataValidade, hoje);
  
  return {
    vencido: diasRestantes < 0,
    proximoVencimento: diasRestantes <= diasAviso && diasRestantes >= 0,
    diasRestantes
  };
};

export const gerarCodigoEPI = (tipo: string, sequencial: number): string => {
  const prefixos: Record<string, string> = {
    'Capacete': 'CAP',
    'Óculos de Proteção': 'OCU',
    'Protetor Auricular': 'PRO',
    'Máscara/Respirador': 'MAS',
    'Luvas': 'LUV',
    'Calçado de Segurança': 'CAL',
    'Cinto de Segurança': 'CIN',
    'Uniforme': 'UNI',
    'Colete Refletivo': 'COL',
    'Outros': 'OUT'
  };

  const prefixo = prefixos[tipo] || 'EPI';
  const numero = sequencial.toString().padStart(4, '0');
  return `${prefixo}${numero}`;
};
