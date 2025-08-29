'use client';

import { MainLayout } from '@/components/MainLayout';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button,
  Switch,
  Input,
  Alert
} from '@nextui-org/react';
import { useEPI } from '@/context/EPIContext';
import { useState } from 'react';
import { Settings, Download, Upload, Trash, AlertTriangle } from 'lucide-react';

export default function ConfiguracoesPage() {
  const { epis, transacoes, funcionarios } = useEPI();
  const [notificacoesAtivadas, setNotificacoesAtivadas] = useState(true);
  const [diasAvisoVencimento, setDiasAvisoVencimento] = useState('30');
  const [diasAvisoAtraso, setDiasAvisoAtraso] = useState('7');

  const exportarDados = () => {
    const dadosCompletos = {
      exportadoEm: new Date().toISOString(),
      versao: '1.0',
      dados: {
        epis: epis.map(epi => ({
          ...epi,
          dataEntrada: epi.dataEntrada.toISOString(),
          dataValidade: epi.dataValidade?.toISOString()
        })),
        transacoes: transacoes.map(t => ({
          ...t,
          dataTransacao: t.dataTransacao.toISOString(),
          prazoDevolucao: t.prazoDevolucao?.toISOString(),
          dataDevolucao: t.dataDevolucao?.toISOString()
        })),
        funcionarios
      }
    };

    const blob = new Blob([JSON.stringify(dadosCompletos, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-epi-sistema-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importarDados = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const dadosImportados = JSON.parse(event.target?.result as string);
            // Em uma aplicação real, você implementaria a lógica de importação aqui
            console.log('Dados para importar:', dadosImportados);
            alert('Funcionalidade de importação em desenvolvimento');
          } catch {
            alert('Erro ao importar dados. Verifique se o arquivo está no formato correto.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const limparTodosDados = () => {
    if (confirm('ATENÇÃO: Esta ação irá apagar TODOS os dados do sistema. Tem certeza?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Settings className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Configurações</h1>
            <p className="text-default-500 mt-1">
              Configurações gerais do sistema
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configurações de Notificações */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Notificações</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <Switch
                isSelected={notificacoesAtivadas}
                onValueChange={setNotificacoesAtivadas}
              >
                Ativar notificações do sistema
              </Switch>

              <Input
                label="Dias para aviso de vencimento"
                type="number"
                value={diasAvisoVencimento}
                onChange={(e) => setDiasAvisoVencimento(e.target.value)}
                description="Quantos dias antes do vencimento mostrar alerta"
              />

              <Input
                label="Dias para aviso de atraso"
                type="number"
                value={diasAvisoAtraso}
                onChange={(e) => setDiasAvisoAtraso(e.target.value)}
                description="Quantos dias de atraso para mostrar alerta"
              />

              <Button color="primary" className="w-full">
                Salvar Configurações
              </Button>
            </CardBody>
          </Card>

          {/* Backup e Restauração */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Backup e Restauração</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="text-sm text-default-600 space-y-2">
                <p>• <strong>EPIs:</strong> {epis.length} registros</p>
                <p>• <strong>Transações:</strong> {transacoes.length} registros</p>
                <p>• <strong>Funcionários:</strong> {funcionarios.length} registros</p>
              </div>

              <div className="space-y-2">
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Download size={18} />}
                  onPress={exportarDados}
                  className="w-full"
                >
                  Exportar Backup
                </Button>

                <Button
                  color="secondary"
                  variant="flat"
                  startContent={<Upload size={18} />}
                  onPress={importarDados}
                  className="w-full"
                >
                  Importar Backup
                </Button>
              </div>

              <Alert
                color="warning"
                variant="flat"
                title="Atenção"
                description="O backup inclui todos os dados do sistema. Mantenha-o em local seguro."
                startContent={<AlertTriangle />}
              />
            </CardBody>
          </Card>

          {/* Manutenção */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <h3 className="text-lg font-semibold">Manutenção do Sistema</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <Alert
                color="danger"
                variant="flat"
                title="Zona de Perigo"
                description="As ações abaixo são irreversíveis. Use com extrema cautela."
                startContent={<AlertTriangle />}
              />

              <Button
                color="danger"
                variant="flat"
                startContent={<Trash size={18} />}
                onPress={limparTodosDados}
                className="w-full"
              >
                Limpar Todos os Dados do Sistema
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Informações do Sistema */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Informações do Sistema</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-default-500">Versão:</span><br />
                <span className="font-medium">1.0.0</span>
              </div>
              <div>
                <span className="text-default-500">Última atualização:</span><br />
                <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
              <div>
                <span className="text-default-500">Banco de dados:</span><br />
                <span className="font-medium">LocalStorage</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
}
