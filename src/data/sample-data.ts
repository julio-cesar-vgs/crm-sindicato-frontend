import { EPI, Funcionario, TransacaoEPI } from '@/types/epi';

export const sampleEPIs: Omit<EPI, 'id'>[] = [
  {
    codigo: 'CAP001',
    nome: 'Capacete de Segurança Class A',
    tipo: 'Capacete',
    descricao: 'Capacete de proteção classe A com jugular',
    certificado: 'CA 31469',
    dataValidade: new Date('2025-12-31'),
    status: 'disponivel',
    condicao: 'novo',
    dataEntrada: new Date('2024-01-15'),
    fornecedor: 'Segurança Total LTDA',
    observacoes: 'Capacete novo, em perfeitas condições'
  },
  {
    codigo: 'LUV002',
    nome: 'Luvas de Proteção Química',
    tipo: 'Luvas',
    descricao: 'Luvas de nitrila para proteção química',
    certificado: 'CA 28467',
    dataValidade: new Date('2024-06-30'),
    status: 'disponivel',
    condicao: 'bom',
    dataEntrada: new Date('2024-01-10'),
    fornecedor: 'EPI Fácil',
    observacoes: 'Par de luvas tamanho G'
  },
  {
    codigo: 'OCU003',
    nome: 'Óculos de Proteção Anti-Risco',
    tipo: 'Óculos de Proteção',
    descricao: 'Óculos com proteção lateral e anti-embaçante',
    certificado: 'CA 15755',
    status: 'emprestado',
    condicao: 'bom',
    dataEntrada: new Date('2024-01-05'),
    fornecedor: 'Proteção Visual',
    observacoes: 'Óculos com hastes ajustáveis'
  },
  {
    codigo: 'CAL004',
    nome: 'Botina de Segurança com Bico de Aço',
    tipo: 'Calçado de Segurança',
    descricao: 'Botina com bico de aço e solado antiderrapante',
    certificado: 'CA 38455',
    status: 'disponivel',
    condicao: 'novo',
    dataEntrada: new Date('2024-01-20'),
    fornecedor: 'Calçados Industriais',
    observacoes: 'Botina número 42'
  },
  {
    codigo: 'UNI005',
    nome: 'Macacão de Segurança',
    tipo: 'Uniforme',
    descricao: 'Macacão de algodão com faixas refletivas',
    status: 'disponivel',
    condicao: 'bom',
    dataEntrada: new Date('2024-01-12'),
    fornecedor: 'Uniformes Industriais',
    observacoes: 'Tamanho G, cor azul'
  }
];

export const sampleFuncionarios: Omit<Funcionario, 'id'>[] = [
  {
    nome: 'João Silva Santos',
    cpf: '123.456.789-01',
    setor: 'Produção',
    cargo: 'Operador de Máquinas',
    email: 'joao.silva@empresa.com'
  },
  {
    nome: 'Maria Oliveira Costa',
    cpf: '987.654.321-02',
    setor: 'Manutenção',
    cargo: 'Técnico em Manutenção',
    email: 'maria.oliveira@empresa.com'
  },
  {
    nome: 'Carlos Eduardo Souza',
    cpf: '456.789.123-03',
    setor: 'Qualidade',
    cargo: 'Analista de Qualidade',
    email: 'carlos.souza@empresa.com'
  },
  {
    nome: 'Ana Paula Lima',
    cpf: '789.123.456-04',
    setor: 'Segurança',
    cargo: 'Técnico de Segurança',
    email: 'ana.lima@empresa.com'
  }
];

export const sampleTransacoes: Omit<TransacaoEPI, 'id'>[] = [
  {
    epiId: 'epi-1', // Será substituído por ID real
    funcionarioId: 'func-1',
    tipo: 'entrada',
    dataTransacao: new Date('2024-01-15'),
    responsavel: 'Ana Paula Lima',
    setor: 'Almoxarifado',
    isPermanente: false,
    observacoes: 'Entrada de lote de capacetes'
  },
  {
    epiId: 'epi-3', // Óculos
    funcionarioId: 'func-1',
    tipo: 'saida',
    dataTransacao: new Date('2024-01-25'),
    responsavel: 'Ana Paula Lima',
    setor: 'Produção',
    prazoDevolucao: new Date('2024-04-25'),
    isPermanente: false,
    observacoes: 'Empréstimo para operação na linha 1',
    condicaoSaida: 'bom'
  }
];

// Função para carregar dados de exemplo
export const loadSampleData = () => {
  if (typeof window !== 'undefined') {
    // Verificar se já existem dados
    const existingEPIs = localStorage.getItem('epis');
    if (!existingEPIs || JSON.parse(existingEPIs).length === 0) {
      // Gerar IDs únicos para os dados de exemplo
      const episWithIds = sampleEPIs.map(epi => ({
        ...epi,
        id: crypto.randomUUID()
      }));
      
      const funcionariosWithIds = sampleFuncionarios.map(func => ({
        ...func,
        id: crypto.randomUUID()
      }));

      // Salvar no localStorage
      localStorage.setItem('epis', JSON.stringify(episWithIds));
      localStorage.setItem('funcionarios', JSON.stringify(funcionariosWithIds));
      
      console.log('Dados de exemplo carregados!');
      return true;
    }
  }
  return false;
};
