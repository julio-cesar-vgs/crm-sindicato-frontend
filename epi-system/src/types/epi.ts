export interface EPI {
  id: string;
  codigo: string;
  nome: string;
  tipo: string;
  descricao?: string;
  certificado?: string;
  dataValidade?: Date;
  status: 'disponivel' | 'emprestado' | 'manutencao' | 'baixado';
  condicao: 'novo' | 'bom' | 'regular' | 'ruim' | 'inutilizado';
  dataEntrada: Date;
  fornecedor?: string;
  observacoes?: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  cpf: string;
  setor: string;
  cargo: string;
  email?: string;
}

export interface TransacaoEPI {
  id: string;
  epiId: string;
  funcionarioId: string;
  tipo: 'entrada' | 'saida' | 'devolucao';
  dataTransacao: Date;
  responsavel: string;
  setor: string;
  prazoDevolucao?: Date;
  isPermanente: boolean;
  observacoes?: string;
  condicaoSaida?: 'novo' | 'bom' | 'regular' | 'ruim' | 'inutilizado';
  condicaoDevolucao?: 'novo' | 'bom' | 'regular' | 'ruim' | 'inutilizado';
  dataDevolucao?: Date;
  funcionarioDevolucao?: string;
  emAtraso?: boolean;
}

export interface Relatorio {
  totalEPIs: number;
  episDisponiveis: number;
  episEmprestados: number;
  episVencidos: number;
  episEmAtraso: number;
  transacoesPorMes: { mes: string; entradas: number; saidas: number; devolucoes: number }[];
  episPorSetor: { setor: string; quantidade: number }[];
  episPorTipo: { tipo: string; quantidade: number }[];
}

export type TipoEPI = 
  | 'Capacete'
  | 'Óculos de Proteção'
  | 'Protetor Auricular'
  | 'Máscara/Respirador'
  | 'Luvas'
  | 'Calçado de Segurança'
  | 'Cinto de Segurança'
  | 'Uniforme'
  | 'Colete Refletivo'
  | 'Outros';

export type StatusEPI = 'disponivel' | 'emprestado' | 'manutencao' | 'baixado';
export type CondicaoEPI = 'novo' | 'bom' | 'regular' | 'ruim' | 'inutilizado';
