'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EPI, TransacaoEPI, Funcionario } from '@/types/epi';

interface EPIContextType {
  epis: EPI[];
  transacoes: TransacaoEPI[];
  funcionarios: Funcionario[];
  addEPI: (epi: Omit<EPI, 'id'>) => void;
  updateEPI: (id: string, epi: Partial<EPI>) => void;
  deleteEPI: (id: string) => void;
  addTransacao: (transacao: Omit<TransacaoEPI, 'id'>) => void;
  addFuncionario: (funcionario: Omit<Funcionario, 'id'>) => void;
  updateFuncionario: (id: string, funcionario: Partial<Funcionario>) => void;
  deleteFuncionario: (id: string) => void;
  getEPIById: (id: string) => EPI | undefined;
  getFuncionarioById: (id: string) => Funcionario | undefined;
  getTransacoesByEPI: (epiId: string) => TransacaoEPI[];
  getEPIsDisponiveis: () => EPI[];
  getEPIsEmprestados: () => EPI[];
  getEPIsVencidos: () => EPI[];
}

const EPIContext = createContext<EPIContextType | undefined>(undefined);

export function EPIProvider({ children }: { children: React.ReactNode }) {
  const [epis, setEpis] = useState<EPI[]>([]);
  const [transacoes, setTransacoes] = useState<TransacaoEPI[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEpis = localStorage.getItem('epis');
      const savedTransacoes = localStorage.getItem('transacoes');
      const savedFuncionarios = localStorage.getItem('funcionarios');

      if (savedEpis) {
        try {
          setEpis(JSON.parse(savedEpis));
        } catch (error) {
          console.error('Erro ao carregar EPIs:', error);
        }
      }
      if (savedTransacoes) {
        try {
          setTransacoes(JSON.parse(savedTransacoes));
        } catch (error) {
          console.error('Erro ao carregar transações:', error);
        }
      }
      if (savedFuncionarios) {
        try {
          setFuncionarios(JSON.parse(savedFuncionarios));
        } catch (error) {
          console.error('Erro ao carregar funcionários:', error);
        }
      }
    }
  }, []);

  // Salvar dados no localStorage quando houver mudanças
  useEffect(() => {
    if (typeof window !== 'undefined' && epis.length > 0) {
      localStorage.setItem('epis', JSON.stringify(epis));
    }
  }, [epis]);

  useEffect(() => {
    if (typeof window !== 'undefined' && transacoes.length > 0) {
      localStorage.setItem('transacoes', JSON.stringify(transacoes));
    }
  }, [transacoes]);

  useEffect(() => {
    if (typeof window !== 'undefined' && funcionarios.length > 0) {
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    }
  }, [funcionarios]);

  const addEPI = (epiData: Omit<EPI, 'id'>) => {
    const novoEPI: EPI = {
      ...epiData,
      id: crypto.randomUUID(),
    };
    setEpis(prev => [...prev, novoEPI]);
  };

  const updateEPI = (id: string, epiData: Partial<EPI>) => {
    setEpis(prev => prev.map(epi => epi.id === id ? { ...epi, ...epiData } : epi));
  };

  const deleteEPI = (id: string) => {
    setEpis(prev => prev.filter(epi => epi.id !== id));
  };

  const addTransacao = (transacaoData: Omit<TransacaoEPI, 'id'>) => {
    const novaTransacao: TransacaoEPI = {
      ...transacaoData,
      id: crypto.randomUUID(),
    };
    setTransacoes(prev => [...prev, novaTransacao]);

    // Atualizar status do EPI baseado na transação
    if (transacaoData.tipo === 'saida') {
      updateEPI(transacaoData.epiId, { status: 'emprestado' });
    } else if (transacaoData.tipo === 'devolucao') {
      updateEPI(transacaoData.epiId, { 
        status: 'disponivel',
        condicao: transacaoData.condicaoDevolucao || 'bom'
      });
    }
  };

  const addFuncionario = (funcionarioData: Omit<Funcionario, 'id'>) => {
    const novoFuncionario: Funcionario = {
      ...funcionarioData,
      id: crypto.randomUUID(),
    };
    setFuncionarios(prev => [...prev, novoFuncionario]);
  };

  const updateFuncionario = (id: string, funcionarioData: Partial<Funcionario>) => {
    setFuncionarios(prev => prev.map(func => func.id === id ? { ...func, ...funcionarioData } : func));
  };

  const deleteFuncionario = (id: string) => {
    setFuncionarios(prev => prev.filter(func => func.id !== id));
  };

  const getEPIById = (id: string) => epis.find(epi => epi.id === id);
  const getFuncionarioById = (id: string) => funcionarios.find(func => func.id === id);
  const getTransacoesByEPI = (epiId: string) => transacoes.filter(t => t.epiId === epiId);
  const getEPIsDisponiveis = () => epis.filter(epi => epi.status === 'disponivel');
  const getEPIsEmprestados = () => epis.filter(epi => epi.status === 'emprestado');
  const getEPIsVencidos = () => epis.filter(epi => {
    return epi.dataValidade && new Date(epi.dataValidade) < new Date();
  });

  return (
    <EPIContext.Provider value={{
      epis,
      transacoes,
      funcionarios,
      addEPI,
      updateEPI,
      deleteEPI,
      addTransacao,
      addFuncionario,
      updateFuncionario,
      deleteFuncionario,
      getEPIById,
      getFuncionarioById,
      getTransacoesByEPI,
      getEPIsDisponiveis,
      getEPIsEmprestados,
      getEPIsVencidos,
    }}>
      {children}
    </EPIContext.Provider>
  );
}

export function useEPI() {
  const context = useContext(EPIContext);
  if (context === undefined) {
    throw new Error('useEPI must be used within an EPIProvider');
  }
  return context;
}
