# Sistema de Gestão de EPIs

Sistema completo para controle de Equipamentos de Proteção Individual (EPIs) desenvolvido com Next.js, TypeScript e NextUI.

## 📋 Funcionalidades

### 🎯 Dashboard
- Visão geral do sistema com estatísticas
- EPIs disponíveis, emprestados e vencidos
- Resumo de transações recentes

### 📦 Gestão de EPIs
- **Entrada**: Cadastro de novos EPIs no sistema
- **Saída/Empréstimo**: Registro de entrega para funcionários
- **Devolução**: Controle de retorno com verificação de prazo e condição
- **Estoque**: Visualização completa do inventário

### 👥 Funcionários
- Cadastro e gerenciamento de funcionários
- Associação com setores e cargos

### 📊 Relatórios
- Relatórios de movimentação por período
- EPIs por setor e tipo
- Controle de vencimentos e atrasos
- Exportação de dados

### ⚙️ Configurações
- Backup e restauração de dados
- Configurações de notificações
- Manutenção do sistema

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- NPM ou Yarn

### Instalação
```bash
# Clone o repositório (se aplicável)
git clone <repository-url>

# Entre no diretório
cd epi-system

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

O sistema estará disponível em `http://localhost:3000`

### Build para Produção
```bash
npm run build
npm start
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js (App Router)
│   ├── entrada/           # Cadastro de EPIs
│   ├── saida/             # Empréstimo de EPIs
│   ├── devolucao/         # Devolução de EPIs
│   ├── estoque/           # Inventário
│   ├── funcionarios/      # Gestão de funcionários
│   ├── relatorios/        # Relatórios e estatísticas
│   └── configuracoes/     # Configurações do sistema
├── components/            # Componentes React
│   ├── MainLayout.tsx     # Layout principal
│   └── Sidebar.tsx        # Menu lateral
├── context/               # Context API
│   └── EPIContext.tsx     # Estado global dos EPIs
├── types/                 # Definições TypeScript
│   └── epi.ts            # Tipos de dados
└── utils/                 # Utilitários
    ├── constants.ts       # Constantes do sistema
    └── validations.ts     # Funções de validação
```

## 📊 Modelo de Dados

### EPI (Equipamento de Proteção Individual)
- Código único
- Nome e descrição
- Tipo (capacete, luvas, etc.)
- Status (disponível, emprestado, manutenção, baixado)
- Condição (novo, bom, regular, ruim, inutilizado)
- Data de validade
- Certificado/CA

### Transações
- Tipo (entrada, saída, devolução)
- Data da transação
- Responsável pela operação
- Setor
- Prazo de devolução (se aplicável)
- Indicador de entrega permanente
- Condição na saída/devolução

### Funcionários
- Nome completo
- CPF
- Setor e cargo
- Email (opcional)

## 🔧 Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **NextUI** - Biblioteca de componentes
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas
- **Framer Motion** - Animações

## 💾 Armazenamento

O sistema utiliza LocalStorage para persistência de dados no navegador. Em um ambiente de produção, seria recomendado integrar com um banco de dados real.

## 🎨 Interface

- Design responsivo para desktop e mobile
- Tema claro/escuro automático
- Interface intuitiva com navegação lateral
- Feedback visual para todas as ações

## 📋 Principais Recursos

### Controle de Prazos
- Verificação automática de atraso na devolução
- Alertas visuais para EPIs vencidos
- Relatórios de vencimento

### Validações
- Campos obrigatórios em formulários
- Validação de CPF
- Verificação de disponibilidade de EPIs

### Rastreabilidade
- Histórico completo de transações
- Identificação de responsáveis
- Registro de condições dos equipamentos

## 🚧 Melhorias Futuras

- Integração com banco de dados
- Notificações por email/SMS
- Relatórios em PDF
- API REST para integração
- Códigos de barras/QR Code
- Dashboard analytics avançado

## 📝 Como Usar

1. **Cadastrar EPIs**: Use o menu "Cadastro de EPI" para adicionar novos equipamentos
2. **Registrar Saída**: Em "Empréstimo/Saída", registre a entrega para funcionários
3. **Fazer Devolução**: Use "Devolução" para registrar o retorno dos EPIs
4. **Consultar Estoque**: Visualize todo o inventário em "Estoque de EPIs"
5. **Ver Relatórios**: Acesse relatórios e estatísticas em "Relatórios"

## 🤝 Contribuições

Este é um sistema base que pode ser expandido conforme necessidades específicas da empresa.

---

**Desenvolvido com Next.js + NextUI para gestão eficiente de EPIs** 🛡️
