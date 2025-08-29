'use client';

import { MainLayout } from '@/components/MainLayout';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tabs,
  Tab
} from '@nextui-org/react';
import { useEPI } from '@/context/EPIContext';
import { useMemo } from 'react';
import { FileText, Download, Calendar, TrendingUp, Users, Package } from 'lucide-react';
import { differenceInDays, format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function RelatoriosPage() {
  const { 
    epis, 
    transacoes, 
    funcionarios,
    getEPIsDisponiveis,
    getEPIsEmprestados,
    getEPIsVencidos
  } = useEPI();

  const episDisponiveis = getEPIsDisponiveis();
  const episEmprestados = getEPIsEmprestados();
  const episVencidos = getEPIsVencidos();

  // Relatório de transações por mês (últimos 6 meses)
  const transacoesPorMes = useMemo(() => {
    const ultimosSeisMeses = eachMonthOfInterval({
      start: subMonths(new Date(), 5),
      end: new Date()
    });

    return ultimosSeisMeses.map(mes => {
      const inicioMes = startOfMonth(mes);
      const fimMes = endOfMonth(mes);
      
      const transacoesMes = transacoes.filter(t => {
        const dataTransacao = new Date(t.dataTransacao);
        return dataTransacao >= inicioMes && dataTransacao <= fimMes;
      });

      return {
        mes: format(mes, 'MMM/yyyy', { locale: ptBR }),
        entradas: transacoesMes.filter(t => t.tipo === 'entrada').length,
        saidas: transacoesMes.filter(t => t.tipo === 'saida').length,
        devolucoes: transacoesMes.filter(t => t.tipo === 'devolucao').length
      };
    });
  }, [transacoes]);

  // EPIs por setor
  const episPorSetor = useMemo(() => {
    const setores = new Map<string, number>();
    
    transacoes
      .filter(t => t.tipo === 'saida')
      .forEach(t => {
        const epi = epis.find(e => e.id === t.epiId);
        if (epi && epi.status === 'emprestado') {
          setores.set(t.setor, (setores.get(t.setor) || 0) + 1);
        }
      });

    return Array.from(setores.entries()).map(([setor, quantidade]) => ({
      setor,
      quantidade
    }));
  }, [transacoes, epis]);

  // EPIs por tipo
  const episPorTipo = useMemo(() => {
    const tipos = new Map<string, number>();
    
    epis.forEach(epi => {
      tipos.set(epi.tipo, (tipos.get(epi.tipo) || 0) + 1);
    });

    return Array.from(tipos.entries()).map(([tipo, quantidade]) => ({
      tipo,
      quantidade
    }));
  }, [epis]);

  // EPIs em atraso
  const episEmAtraso = useMemo(() => {
    return transacoes
      .filter(t => t.tipo === 'saida' && !t.isPermanente && t.prazoDevolucao)
      .map(t => {
        const epi = epis.find(e => e.id === t.epiId);
        const funcionario = funcionarios.find(f => f.id === t.funcionarioId);
        const hoje = new Date();
        const prazo = new Date(t.prazoDevolucao!);
        const diasAtraso = differenceInDays(hoje, prazo);
        
        return {
          transacao: t,
          epi,
          funcionario,
          diasAtraso: diasAtraso > 0 ? diasAtraso : 0,
          emAtraso: diasAtraso > 0
        };
      })
      .filter(item => item.emAtraso && item.epi?.status === 'emprestado');
  }, [transacoes, epis, funcionarios]);

  const exportarRelatorio = () => {
    // Implementação básica de exportação (em uma aplicação real, seria um PDF ou Excel)
    const relatorioData = {
      geradoEm: new Date().toLocaleString('pt-BR'),
      resumo: {
        totalEPIs: epis.length,
        disponiveis: episDisponiveis.length,
        emprestados: episEmprestados.length,
        vencidos: episVencidos.length,
        emAtraso: episEmAtraso.length
      },
      episPorTipo,
      episPorSetor,
      transacoesPorMes
    };

    const blob = new Blob([JSON.stringify(relatorioData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-epis-${format(new Date(), 'yyyy-MM-dd')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Relatórios</h1>
              <p className="text-default-500 mt-1">
                Análise e estatísticas do sistema de EPIs
              </p>
            </div>
          </div>
          
          <Button
            color="primary"
            startContent={<Download size={18} />}
            onPress={exportarRelatorio}
          >
            Exportar Relatório
          </Button>
        </div>

        <Tabs aria-label="Relatórios" defaultSelectedKey="resumo">
          <Tab key="resumo" title="Resumo Geral">
            <div className="space-y-6">
              {/* Cards de resumo */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardBody className="text-center p-4">
                    <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{epis.length}</p>
                    <p className="text-sm text-default-500">Total de EPIs</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="text-center p-4">
                    <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-2xl font-bold">{episDisponiveis.length}</p>
                    <p className="text-sm text-default-500">Disponíveis</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="text-center p-4">
                    <Users className="w-8 h-8 text-warning mx-auto mb-2" />
                    <p className="text-2xl font-bold">{episEmprestados.length}</p>
                    <p className="text-sm text-default-500">Emprestados</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="text-center p-4">
                    <Calendar className="w-8 h-8 text-danger mx-auto mb-2" />
                    <p className="text-2xl font-bold">{episEmAtraso.length}</p>
                    <p className="text-sm text-default-500">Em Atraso</p>
                  </CardBody>
                </Card>
              </div>

              {/* EPIs por tipo */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">EPIs por Tipo</h3>
                </CardHeader>
                <CardBody>
                  <Table aria-label="EPIs por tipo">
                    <TableHeader>
                      <TableColumn>TIPO</TableColumn>
                      <TableColumn>QUANTIDADE</TableColumn>
                      <TableColumn>PERCENTUAL</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {episPorTipo.map(({ tipo, quantidade }) => (
                        <TableRow key={tipo}>
                          <TableCell>{tipo}</TableCell>
                          <TableCell>{quantidade}</TableCell>
                          <TableCell>
                            {epis.length > 0 ? ((quantidade / epis.length) * 100).toFixed(1) : 0}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </Tab>

          <Tab key="transacoes" title="Movimentação">
            <div className="space-y-6">
              {/* Transações por mês */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Movimentação por Mês (Últimos 6 meses)</h3>
                </CardHeader>
                <CardBody>
                  <Table aria-label="Transações por mês">
                    <TableHeader>
                      <TableColumn>MÊS</TableColumn>
                      <TableColumn>ENTRADAS</TableColumn>
                      <TableColumn>SAÍDAS</TableColumn>
                      <TableColumn>DEVOLUÇÕES</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {transacoesPorMes.map((item) => (
                        <TableRow key={item.mes}>
                          <TableCell>{item.mes}</TableCell>
                          <TableCell>
                            <Chip color="success" size="sm">{item.entradas}</Chip>
                          </TableCell>
                          <TableCell>
                            <Chip color="warning" size="sm">{item.saidas}</Chip>
                          </TableCell>
                          <TableCell>
                            <Chip color="primary" size="sm">{item.devolucoes}</Chip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>

              {/* EPIs por setor */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">EPIs Emprestados por Setor</h3>
                </CardHeader>
                <CardBody>
                  <Table aria-label="EPIs por setor">
                    <TableHeader>
                      <TableColumn>SETOR</TableColumn>
                      <TableColumn>QUANTIDADE</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {episPorSetor.map(({ setor, quantidade }) => (
                        <TableRow key={setor}>
                          <TableCell>{setor}</TableCell>
                          <TableCell>
                            <Chip color="primary" size="sm">{quantidade}</Chip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </Tab>

          <Tab key="atrasos" title="EPIs em Atraso">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">EPIs com Devolução em Atraso</h3>
              </CardHeader>
              <CardBody>
                {episEmAtraso.length > 0 ? (
                  <Table aria-label="EPIs em atraso">
                    <TableHeader>
                      <TableColumn>EPI</TableColumn>
                      <TableColumn>FUNCIONÁRIO</TableColumn>
                      <TableColumn>SETOR</TableColumn>
                      <TableColumn>PRAZO</TableColumn>
                      <TableColumn>ATRASO (DIAS)</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {episEmAtraso.map((item) => (
                        <TableRow key={item.transacao.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.epi?.codigo}</p>
                              <p className="text-sm text-default-500">{item.epi?.nome}</p>
                            </div>
                          </TableCell>
                          <TableCell>{item.funcionario?.nome || 'N/A'}</TableCell>
                          <TableCell>{item.transacao.setor}</TableCell>
                          <TableCell>
                            {item.transacao.prazoDevolucao
                              ? new Date(item.transacao.prazoDevolucao).toLocaleDateString('pt-BR')
                              : 'N/A'
                            }
                          </TableCell>
                          <TableCell>
                            <Chip color="danger" size="sm">
                              {item.diasAtraso} dias
                            </Chip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-default-500">Nenhum EPI em atraso!</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>

          <Tab key="vencimentos" title="Vencimentos">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">EPIs com Validade Vencida ou Próxima</h3>
              </CardHeader>
              <CardBody>
                <Table aria-label="EPIs vencidos">
                  <TableHeader>
                    <TableColumn>CÓDIGO</TableColumn>
                    <TableColumn>NOME</TableColumn>
                    <TableColumn>TIPO</TableColumn>
                    <TableColumn>VALIDADE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {epis
                      .filter(epi => epi.dataValidade)
                      .sort((a, b) => {
                        const dataA = new Date(a.dataValidade!);
                        const dataB = new Date(b.dataValidade!);
                        return dataA.getTime() - dataB.getTime();
                      })
                      .slice(0, 20)
                      .map((epi) => {
                        const hoje = new Date();
                        const validade = new Date(epi.dataValidade!);
                        const diasParaVencer = differenceInDays(validade, hoje);
                        const vencido = diasParaVencer < 0;
                        const venceEm30Dias = diasParaVencer <= 30 && diasParaVencer >= 0;

                        return (
                          <TableRow key={epi.id}>
                            <TableCell className="font-mono">{epi.codigo}</TableCell>
                            <TableCell>{epi.nome}</TableCell>
                            <TableCell>{epi.tipo}</TableCell>
                            <TableCell>{validade.toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>
                              <Chip 
                                color={vencido ? 'danger' : venceEm30Dias ? 'warning' : 'success'}
                                size="sm"
                              >
                                {vencido 
                                  ? `Vencido há ${Math.abs(diasParaVencer)} dias`
                                  : venceEm30Dias
                                    ? `Vence em ${diasParaVencer} dias`
                                    : 'Válido'
                                }
                              </Chip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  );
}
