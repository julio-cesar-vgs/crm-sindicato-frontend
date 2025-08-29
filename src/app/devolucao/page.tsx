'use client';

import { MainLayout } from '@/components/MainLayout';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Input, 
  Select, 
  SelectItem, 
  Button, 
  Textarea,
  Chip,
  Alert
} from '@nextui-org/react';
import { useEPI } from '@/context/EPIContext';
import { CondicaoEPI, TransacaoEPI, EPI, Funcionario } from '@/types/epi';
import { useState, useEffect } from 'react';
import { RotateCcw, Save, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { differenceInDays } from 'date-fns';

const condicoesEPI: CondicaoEPI[] = [
  'novo',
  'bom',
  'regular',
  'ruim',
  'inutilizado'
];

export default function DevolucaoPage() {
  const { 
    addTransacao, 
    getEPIsEmprestados, 
    getEPIById,
    getFuncionarioById,
    transacoes
  } = useEPI();
  
  const [isLoading, setIsLoading] = useState(false);
  const episEmprestados = getEPIsEmprestados();
  
  const [formData, setFormData] = useState({
    epiId: '',
    funcionarioDevolucao: '',
    condicaoDevolucao: 'bom' as CondicaoEPI,
    observacoes: ''
  });

  const [transacaoInfo, setTransacaoInfo] = useState<{
    transacao: TransacaoEPI;
    epi: EPI;
    funcionario: Funcionario;
    emAtraso: boolean;
    diasAtraso?: number;
  } | null>(null);

  useEffect(() => {
    if (formData.epiId) {
      // Buscar última transação de saída para este EPI
      const transacoesSaida = transacoes
        .filter(t => t.epiId === formData.epiId && t.tipo === 'saida')
        .sort((a, b) => new Date(b.dataTransacao).getTime() - new Date(a.dataTransacao).getTime());
      
      const ultimaTransacao = transacoesSaida[0];
      
      if (ultimaTransacao) {
        const epi = getEPIById(formData.epiId);
        const funcionario = getFuncionarioById(ultimaTransacao.funcionarioId);
        
        let emAtraso = false;
        let diasAtraso = 0;
        
        if (!ultimaTransacao.isPermanente && ultimaTransacao.prazoDevolucao) {
          const hoje = new Date();
          const prazo = new Date(ultimaTransacao.prazoDevolucao);
          diasAtraso = differenceInDays(hoje, prazo);
          emAtraso = diasAtraso > 0;
        }

        if (epi && funcionario) {
          setTransacaoInfo({
            transacao: ultimaTransacao,
            epi,
            funcionario,
            emAtraso,
            diasAtraso: emAtraso ? diasAtraso : undefined
          });
        }
      }
    } else {
      setTransacaoInfo(null);
    }
  }, [formData.epiId, transacoes, getEPIById, getFuncionarioById]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      if (!formData.epiId || !formData.funcionarioDevolucao) {
        alert('Por favor, preencha os campos obrigatórios');
        return;
      }

      if (!transacaoInfo) {
        alert('Não foi possível encontrar informações da saída deste EPI');
        return;
      }

      addTransacao({
        epiId: formData.epiId,
        funcionarioId: transacaoInfo.funcionario?.id || '',
        tipo: 'devolucao',
        dataTransacao: new Date(),
        responsavel: formData.funcionarioDevolucao,
        setor: transacaoInfo.transacao.setor,
        isPermanente: transacaoInfo.transacao.isPermanente,
        observacoes: formData.observacoes,
        condicaoDevolucao: formData.condicaoDevolucao,
        dataDevolucao: new Date(),
        funcionarioDevolucao: formData.funcionarioDevolucao,
        emAtraso: transacaoInfo.emAtraso
      });

      // Limpar formulário
      setFormData({
        epiId: '',
        funcionarioDevolucao: '',
        condicaoDevolucao: 'bom',
        observacoes: ''
      });

      alert('Devolução registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar devolução:', error);
      alert('Erro ao registrar devolução. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <RotateCcw className="w-8 h-8 text-success" />
          <div>
            <h1 className="text-3xl font-bold">Devolução de EPI</h1>
            <p className="text-default-500 mt-1">
              Registro de devolução e avaliação de EPIs
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Dados da Devolução</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Select
              isRequired
              label="EPI para Devolução"
              placeholder="Selecione um EPI emprestado"
              selectedKeys={formData.epiId ? [formData.epiId] : []}
              onSelectionChange={(selection) => {
                const value = Array.from(selection)[0] as string;
                setFormData(prev => ({ ...prev, epiId: value }));
              }}
            >
              {episEmprestados.map((epi) => (
                <SelectItem key={epi.id} value={epi.id}>
                  {epi.codigo} - {epi.nome} ({epi.tipo})
                </SelectItem>
              ))}
            </Select>

            {transacaoInfo && (
              <div className="space-y-4">
                <Card className="bg-default-50">
                  <CardHeader className="pb-2">
                    <h4 className="font-semibold">Informações do Empréstimo</h4>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-default-500">Funcionário:</span><br />
                        <span className="font-medium">
                          {transacaoInfo.funcionario?.nome || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-default-500">Setor:</span><br />
                        <span className="font-medium">{transacaoInfo.transacao.setor}</span>
                      </div>
                      <div>
                        <span className="text-default-500">Data de Saída:</span><br />
                        <span className="font-medium">
                          {new Date(transacaoInfo.transacao.dataTransacao).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div>
                        <span className="text-default-500">Responsável:</span><br />
                        <span className="font-medium">{transacaoInfo.transacao.responsavel}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Alert de prazo */}
                {!transacaoInfo.transacao.isPermanente && (
                  <Alert
                    color={transacaoInfo.emAtraso ? "danger" : "success"}
                    variant="flat"
                    title={
                      transacaoInfo.emAtraso 
                        ? `Devolução em atraso (${transacaoInfo.diasAtraso} dias)`
                        : "Devolução no prazo"
                    }
                    description={
                      transacaoInfo.transacao.prazoDevolucao
                        ? `Prazo: ${new Date(transacaoInfo.transacao.prazoDevolucao).toLocaleDateString('pt-BR')}`
                        : 'Prazo não definido'
                    }
                    startContent={
                      transacaoInfo.emAtraso ? <AlertTriangle /> : <CheckCircle />
                    }
                  />
                )}

                {transacaoInfo.transacao.isPermanente && (
                  <Alert
                    color="primary"
                    variant="flat"
                    title="Entrega Permanente"
                    description="Este EPI foi entregue de forma permanente"
                    startContent={<Clock />}
                  />
                )}
              </div>
            )}

            <div className="space-y-4">
              <Input
                isRequired
                label="Responsável pela Devolução"
                placeholder="Nome de quem recebeu"
                value={formData.funcionarioDevolucao}
                onChange={(e) => setFormData(prev => ({ ...prev, funcionarioDevolucao: e.target.value }))}
              />

              <Select
                isRequired
                label="Condição do EPI"
                placeholder="Avalie a condição"
                selectedKeys={[formData.condicaoDevolucao]}
                onSelectionChange={(selection) => {
                  const value = Array.from(selection)[0] as CondicaoEPI;
                  setFormData(prev => ({ ...prev, condicaoDevolucao: value }));
                }}
              >
                {condicoesEPI.map((condicao) => (
                  <SelectItem key={condicao} value={condicao}>
                    <div className="flex items-center space-x-2">
                      <Chip 
                        size="sm" 
                        color={
                          condicao === 'novo' ? 'success' :
                          condicao === 'bom' ? 'primary' :
                          condicao === 'regular' ? 'warning' : 'danger'
                        }
                      >
                        {condicao.charAt(0).toUpperCase() + condicao.slice(1)}
                      </Chip>
                    </div>
                  </SelectItem>
                ))}
              </Select>

              <Textarea
                label="Observações da Devolução"
                placeholder="Observações sobre a condição do EPI, danos, etc..."
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              />

              <Button
                color="primary"
                size="lg"
                startContent={<Save size={20} />}
                onPress={handleSubmit}
                isLoading={isLoading}
                isDisabled={!formData.epiId || !formData.funcionarioDevolucao}
                className="w-full"
              >
                Confirmar Devolução
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
}
